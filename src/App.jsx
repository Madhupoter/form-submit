import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "./App.css";
import Contact from "./components/Contact/Contact";

// Create extra page components
function Home() {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to MyCompany</h1>
      <p>We provide the best web solutions for your business.</p>
    </div>
  );
}

function About() {
  return (
    <div className="text-center mt-5">
      <h2>About Us</h2>
      <p>We are a creative web development and design company.</p>
    </div>
  );
}

function WebDesign() {
  return (
    <div className="text-center mt-5">
      <h2>Web Design Services</h2>
      <p>We create modern, responsive, and user-friendly web designs.</p>
    </div>
  );
}

function Development() {
  return (
    <div className="text-center mt-5">
      <h2>Development Services</h2>
      <p>Our developers build fast, secure, and scalable applications.</p>
    </div>
  );
}

function SEO() {
  return (
    <div className="text-center mt-5">
      <h2>SEO Services</h2>
      <p>We help your website rank higher and reach your audience.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            MyCompany
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>

              <NavDropdown title="Services" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/services/web-design">
                  Web Design
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/development">
                  Development
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/seo">
                  SEO
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/web-design" element={<WebDesign />} />
        <Route path="/services/development" element={<Development />} />
        <Route path="/services/seo" element={<SEO />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
