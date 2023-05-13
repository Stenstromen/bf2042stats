/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { HiDesktopComputer } from "react-icons/hi";
import { FaPlaystation, FaSnowboarding, FaXbox } from "react-icons/fa";

function PlatRegSelectorBar({
  setRegion,
  setPlatform,
  userSearch,
  setUserSearch,
  autoFetch,
  setAutoFetch,
  loading,
  show,
  setShow,
}: {
  setRegion: (region: string) => void;
  setPlatform: (platform: string) => void;
  userSearch: string;
  setUserSearch: (userSearch: string) => void;
  autoFetch: boolean;
  setAutoFetch: (autoFetch: boolean) => void;
  loading: boolean;
  show: {
    mapStats: boolean;
    soldierAmount: boolean;
    serverAmount: boolean;
    platformsAmount: boolean;
    modesAmount: boolean;
    regionMaps: boolean;
    serverSettings: boolean;
  };
  setShow: (show: {
    mapStats: boolean;
    soldierAmount: boolean;
    serverAmount: boolean;
    platformsAmount: boolean;
    modesAmount: boolean;
    regionMaps: boolean;
    serverSettings: boolean;
  }) => void;
}) {
  const [displayRegion, setDisplayRegion] = useState("");
  const [displayPlatform, setDisplayPlatform] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return window.addEventListener("keydown", (e) => {
      if (e.keyCode === 75 && e.metaKey) {
        e.preventDefault();
        searchInput.current!.focus();
      }
    });
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
              title={displayRegion ? displayRegion : "🌍 ALL"}
              id="basic-navbar-nav"
            >
              <NavDropdown.Item
                onClick={() => {
                  setRegion("ALL");
                  setDisplayRegion("🌍 ALL");
                }}
              >
                🌍 ALL
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setRegion("EU");
                  setDisplayRegion("🇪🇺 EU");
                }}
              >
                🇪🇺 EU
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setRegion("Asia");
                  setDisplayRegion("🇯🇵 ASIA");
                }}
              >
                🇯🇵 ASIA
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setRegion("NAm");
                  setDisplayRegion("🇺🇸 N AM");
                }}
              >
                🇺🇸 N AM
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setRegion("SAm");
                  setDisplayRegion("🇲🇽 S AM");
                }}
              >
                🇲🇽 S AM
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setRegion("Afr");
                  setDisplayRegion("🇿🇦 Africa");
                }}
              >
                🇿🇦 Africa
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setRegion("OC");
                  setDisplayRegion("🇦🇺 Oceana");
                }}
              >
                🇦🇺 Oceana
              </NavDropdown.Item>
            </NavDropdown>
            <NavBar.Text className="text-warning">Platform</NavBar.Text>
            <NavDropdown
              title={displayPlatform ? displayPlatform : "👾 ALL"}
              id="basic-navbar-nav"
            >
              <NavDropdown.Item
                onClick={() => {
                  setPlatform("all");
                  setDisplayPlatform("ALL");
                }}
              >
                👾 ALL
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setPlatform("pc");
                  setDisplayPlatform("PC");
                }}
              >
                <HiDesktopComputer size={22} /> PC
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setPlatform("xboxone");
                  setDisplayPlatform("XBox One");
                }}
              >
                <FaXbox size={21} /> XBox One
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setPlatform("ps4");
                  setDisplayPlatform("PlayStation 4");
                }}
              >
                <FaPlaystation size={21} /> PlayStation 4
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setPlatform("ps5");
                  setDisplayPlatform("PlayStation 5");
                }}
              >
                <FaPlaystation size={21} /> PlayStation 5
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setPlatform("xboxseries");
                  setDisplayPlatform("XBox Series");
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
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </Form>

          <Form.Check
            style={{ fontSize: "17px" }}
            className="text-warning"
            type="switch"
            id="autofetch switch"
            label="AutoUpdate?"
            defaultChecked={autoFetch}
            onChange={() => setAutoFetch(!autoFetch)}
          />
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
}

PlatRegSelectorBar.propTypes = {
  setRegion: PropTypes.func.isRequired,
  setPlatform: PropTypes.func.isRequired,
  setAutoFetch: PropTypes.func.isRequired,
};

export default PlatRegSelectorBar;
