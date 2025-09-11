import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Header = () => {
  return (
    <div>
      <Navbar expand="lg" bg="white" className="shadow-sm py-3" sticky="top">
        <Container>
          {/* Brand / Logo */}
          <Navbar.Brand href="#home" className="fw-bold fs-4">
            <span className="text-dark">AI </span>
            <span
              className=""
              style={{
                background: "linear-gradient(90deg, #00d9ff, #0d6efd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Mentor
            </span>
          </Navbar.Brand>

          {/* Mobile Toggle */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Links + Button */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-between"
          >
            {/* Center Nav Links */}
            <Nav className="mx-auto text-center">
              <Nav.Link href="#about" className="mx-2">
                About
              </Nav.Link>
              <Nav.Link href="#services" className="mx-2">
                Services
              </Nav.Link>
              <Nav.Link href="#testimonials" className="mx-2">
                Testimonials
              </Nav.Link>
              <Nav.Link href="#contact" className="mx-2">
                Contact
              </Nav.Link>
            </Nav>

            {/* Right Button */}
            <div className="text-center mt-3 mt-lg-0">
              <Button variant="primary" className="px-4 rounded-pill">
                Get Started
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
