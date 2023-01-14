import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { HiDesktopComputer } from "react-icons/hi";
import { FaPlaystation, FaXbox } from "react-icons/fa";

function PlatRegSelectorBar({
  setRegion,
  setPlatform,
  userSearch,
  setUserSearch,
}: {
  setRegion: (region: string) => void;
  setPlatform: (platform: string) => void;
  userSearch: string;
  setUserSearch: (userSearch: string) => void;
}) {
  const [displayRegion, setDisplayRegion] = useState("");
  const [displayPlatform, setDisplayPlatform] = useState("");

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
          </Nav>
          <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="User Search"
              className="me-2"
              aria-label="User Search"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </Form>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
}

PlatRegSelectorBar.propTypes = {
  setRegion: PropTypes.func.isRequired,
  setPlatform: PropTypes.func.isRequired,
};

export default PlatRegSelectorBar;
