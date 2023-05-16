/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { HiDesktopComputer } from "react-icons/hi";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { IPlatRegSelectorBar, ShowState } from "../Types";

function PlatRegSelectorBar({
  search,
  setSearch,
  loading,
  selectorSettings,
  setSelectorSettings,
  show,
  setShow,
}: IPlatRegSelectorBar) {
  const searchInput = useRef<HTMLInputElement>(null);
  const regions = [
    { id: "ALL", display: "🌍 ALL" },
    { id: "EU", display: "🇪🇺 EU" },
    { id: "Asia", display: "🇯🇵 ASIA" },
    { id: "NAm", display: "🇺🇸 N AM" },
    { id: "SAm", display: "🇲🇽 S AM" },
    { id: "Afr", display: "🇿🇦 Africa" },
    { id: "OC", display: "🇦🇺 Oceana" },
  ];
  const platforms = [
    { id: "all", display: "👾 ALL", icon: null },
    { id: "pc", display: "🖥️ PC", icon: <HiDesktopComputer size={22} /> },
    { id: "xboxone", display: "XBox One", icon: <FaXbox size={21} /> },
    { id: "ps4", display: "PlayStation 4", icon: <FaPlaystation size={21} /> },
    { id: "ps5", display: "PlayStation 5", icon: <FaPlaystation size={21} /> },
    { id: "xboxseries", display: "XBox Series", icon: <FaXbox size={21} /> },
  ];
  const cards = [
    { id: "Active Portal Maps", field: "mapStats" as keyof ShowState },
    { id: "Active Region Soldiers", field: "soldierAmount" as keyof ShowState },
    { id: "Active Region Servers", field: "serverAmount" as keyof ShowState },
    {
      id: "Active Region Platforms",
      field: "platformsAmount" as keyof ShowState,
    },
    { id: "Active Region Modes", field: "modesAmount" as keyof ShowState },
    { id: "Active Region Maps", field: "regionMaps" as keyof ShowState },
    {
      id: "Active Region Settings",
      field: "serverSettings" as keyof ShowState,
    },
  ];

  const handleRegionChange = useCallback(
    (region: string, displayRegion: string) => {
      return setSelectorSettings({
        ...selectorSettings,
        region: region,
        displayRegion: displayRegion,
      });
    },
    []
  );

  const handlePlatformChange = useCallback(
    (platform: string, displayPlatform: string) => {
      return setSelectorSettings({
        ...selectorSettings,
        platform: platform,
        displayPlatform: displayPlatform,
      });
    },
    []
  );

  type ShowFields = keyof typeof show;
  const handleCheckChange = useCallback(
    (field: ShowFields) => {
      setShow({ ...show, [field]: !show[field] });
    },
    [show]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 75 && e.metaKey) {
        e.preventDefault();
        searchInput.current!.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <NavBar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <NavBar.Brand>BF2042Stats</NavBar.Brand>
        <NavBar.Toggle aria-controls="basic-navbar-nav" />
        <NavBar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavBar.Text className="text-warning">Region</NavBar.Text>
            <NavDropdown
              title={
                selectorSettings.displayRegion
                  ? selectorSettings.displayRegion
                  : "🌍 ALL"
              }
              id="basic-navbar-nav"
            >
              {regions.map((region) => (
                <NavDropdown.Item
                  key={region.id}
                  id={region.id}
                  onClick={() => handleRegionChange(region.id, region.display)}
                >
                  {region.display}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavBar.Text className="text-warning">Platform</NavBar.Text>
            <NavDropdown
              title={
                selectorSettings.displayPlatform
                  ? selectorSettings.displayPlatform
                  : "👾 ALL"
              }
              id="basic-navbar-nav"
            >
              {platforms.map((platform) => (
                <NavDropdown.Item
                  key={platform.id}
                  onClick={() =>
                    handlePlatformChange(platform.id, platform.display)
                  }
                >
                  {platform.icon} {platform.display}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavBar.Text className="text-warning">Show/Hide Cards</NavBar.Text>
            <NavDropdown title="Cards">
              {cards.map((card) => (
                <Form.Check
                  key={card.id}
                  style={{
                    fontSize: "17px",
                    width: "250px",
                    marginLeft: "10px",
                  }}
                  type="switch"
                  id={card.id}
                  label={card.id}
                  defaultChecked={show[card.field]}
                  onChange={() => handleCheckChange(card.field)}
                />
              ))}
            </NavDropdown>
          </Nav>
          {loading ? <Spinner animation="border" variant="warning" /> : null}
          <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              ref={searchInput}
              type="search"
              placeholder="User Search [⌘ + K]"
              className="me-2"
              aria-label="User Search"
              value={search.query}
              onChange={(e) => setSearch({ ...search, query: e.target.value })}
            />
          </Form>
          <Form.Check
            style={{ fontSize: "17px" }}
            className="text-warning"
            type="switch"
            id="autofetch switch"
            label="AutoUpdate?"
            defaultChecked={selectorSettings.autoFetch}
            onChange={() =>
              setSelectorSettings({
                ...selectorSettings,
                autoFetch: !selectorSettings.autoFetch,
              })
            }
          />
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
}

export default PlatRegSelectorBar;
