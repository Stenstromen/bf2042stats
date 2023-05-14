/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { HiDesktopComputer } from "react-icons/hi";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { ISelectorSettings, IShow, ISearch } from "../Types";

function PlatRegSelectorBar({
  search,
  setSearch,
  loading,
  selectorSettings,
  setSelectorSettings,
  show,
  setShow,
}: {
  search: ISearch;
  setSearch: (search: ISearch) => void;
  loading: boolean;
  selectorSettings: ISelectorSettings;
  setSelectorSettings: (selectorSettings: ISelectorSettings) => void;
  show: IShow;
  setShow: (show: IShow) => void;
}) {
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return window.addEventListener("keydown", (e) => {
      if (e.keyCode === 75 && e.metaKey) {
        e.preventDefault();
        searchInput.current!.focus();
      }
    });
  }, []);

  const region = (region: string) => {
    setSelectorSettings({ ...selectorSettings, region: region });
    switch (region) {
      case "ALL":
        return setSelectorSettings({
          ...selectorSettings,
          region: "ALL",
          displayRegion: "🌍 ALL",
        });
      case "EU":
        return setSelectorSettings({
          ...selectorSettings,
          region: "EU",
          displayRegion: "🇪🇺 EU",
        });
      case "Asia":
        return setSelectorSettings({
          ...selectorSettings,
          region: "Asia",
          displayRegion: "🇯🇵 ASIA",
        });
      case "NAm":
        return setSelectorSettings({
          ...selectorSettings,
          region: "NAm",
          displayRegion: "🇺🇸 N AM",
        });
      case "SAm":
        return setSelectorSettings({
          ...selectorSettings,
          region: "SAm",
          displayRegion: "🇲🇽 S AM",
        });
      case "OC":
        return setSelectorSettings({
          ...selectorSettings,
          region: "OC",
          displayRegion: "🇦🇺 Oceana",
        });
      case "Afr":
        return setSelectorSettings({
          ...selectorSettings,
          region: "Afr",
          displayRegion: "🇿🇦 Africa",
        });
      default:
        return setSelectorSettings({
          ...selectorSettings,
          region: "ALL",
          displayRegion: "🌍 ALL",
        });
    }
  };

  const platform = (platform: string) => {
    setSelectorSettings({ ...selectorSettings, platform: platform });
    switch (platform) {
      case "all":
        return setSelectorSettings({
          ...selectorSettings,
          platform: "ALL",
          displayPlatform: "👾 ALL",
        });
      case "pc":
        return setSelectorSettings({
          ...selectorSettings,
          platform: "PC",
        });
      case "xboxone":
        return setSelectorSettings({
          ...selectorSettings,
          platform: "xboxone",
          displayPlatform: "XBox One",
        });
      case "ps4":
        return setSelectorSettings({
          ...selectorSettings,
          platform: "ps4",
          displayPlatform: "PlayStation 4",
        });
      case "ps5":
        return setSelectorSettings({
          ...selectorSettings,
          platform: "ps5",
          displayPlatform: "PlayStation 5",
        });
      case "xboxseries":
        return setSelectorSettings({
          ...selectorSettings,
          platform: "xboxseries",
          displayPlatform: "XBox Series",
        });
      default:
        return setSelectorSettings({
          ...selectorSettings,
          platform: "PC",
          displayPlatform: "👾 PC",
        });
    }
  };

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
              <NavDropdown.Item
                id="ALL"
                onClick={() => {
                  region("ALL");
                }}
              >
                🌍 ALL
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  region("EU");
                }}
              >
                🇪🇺 EU
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  region("Asia");
                }}
              >
                🇯🇵 ASIA
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  region("NAm");
                }}
              >
                🇺🇸 N AM
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  region("SAm");
                }}
              >
                🇲🇽 S AM
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  region("Afr");
                }}
              >
                🇿🇦 Africa
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  region("OC");
                }}
              >
                🇦🇺 Oceana
              </NavDropdown.Item>
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
              <NavDropdown.Item
                onClick={() => {
                  platform("all");
                }}
              >
                👾 ALL
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  platform("pc");
                }}
              >
                <HiDesktopComputer size={22} /> PC
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  platform("xboxone");
                }}
              >
                <FaXbox size={21} /> XBox One
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  platform("ps4");
                }}
              >
                <FaPlaystation size={21} /> PlayStation 4
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  platform("ps5");
                }}
              >
                <FaPlaystation size={21} /> PlayStation 5
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  platform("xboxseries");
                }}
              >
                <FaXbox size={21} /> XBox Series
              </NavDropdown.Item>
            </NavDropdown>
            <NavBar.Text className="text-warning">Show/Hide Cards</NavBar.Text>
            <NavDropdown title="Cards">
              <Form.Check
                style={{ fontSize: "17px", width: "250px", marginLeft: "10px" }}
                type="switch"
                id="Active Portal Maps"
                label="Active Portal Maps"
                defaultChecked={show.mapStats}
                onChange={() => setShow({ ...show, mapStats: !show.mapStats })}
              />
              <Form.Check
                style={{ fontSize: "17px", width: "250px", marginLeft: "10px" }}
                type="switch"
                id="Active Region Soldiers"
                label="Active Region Soldiers"
                defaultChecked={show.soldierAmount}
                onChange={() =>
                  setShow({ ...show, soldierAmount: !show.soldierAmount })
                }
              />
              <Form.Check
                style={{ fontSize: "17px", width: "250px", marginLeft: "10px" }}
                type="switch"
                id="Active Region Servers"
                label="Active Region Servers"
                defaultChecked={show.serverAmount}
                onChange={() =>
                  setShow({ ...show, serverAmount: !show.serverAmount })
                }
              />
              <Form.Check
                style={{ fontSize: "17px", width: "250px", marginLeft: "10px" }}
                type="switch"
                id="Active Region Platforms"
                label="Active Region Platforms"
                defaultChecked={show.platformsAmount}
                onChange={() =>
                  setShow({ ...show, platformsAmount: !show.platformsAmount })
                }
              />
              <Form.Check
                style={{ fontSize: "17px", width: "250px", marginLeft: "10px" }}
                type="switch"
                id="Active Region Modes"
                label="Active Region Modes"
                defaultChecked={show.modesAmount}
                onChange={() =>
                  setShow({ ...show, modesAmount: !show.modesAmount })
                }
              />
              <Form.Check
                style={{ fontSize: "17px", width: "250px", marginLeft: "10px" }}
                type="switch"
                id="Active Region Maps"
                label="Active Region Maps"
                defaultChecked={show.regionMaps}
                onChange={() =>
                  setShow({ ...show, regionMaps: !show.regionMaps })
                }
              />
              <Form.Check
                style={{ fontSize: "17px", width: "250px", marginLeft: "10px" }}
                type="switch"
                id="Active Region Settings"
                label="Active Region Settings"
                defaultChecked={show.serverSettings}
                onChange={() =>
                  setShow({ ...show, serverSettings: !show.serverSettings })
                }
              />
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
