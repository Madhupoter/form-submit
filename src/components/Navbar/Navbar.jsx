import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

function CustomNavbar() {
    return (
        <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-bold text-primary">
                    <img
                        src="/vite.svg"
                        alt="Logo"
                        width="30"
                        height="30"
                        className="d-inline-block align-text-top me-2"
                    />
                    ReactSite
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" end>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/about">
                            About
                        </Nav.Link>
                        <NavDropdown title="Services" id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/services#web">
                                Web Development
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/services#uiux">
                                UI/UX Design
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/services#seo">
                                SEO Optimization
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={NavLink} to="/contact">
                            Contact
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default CustomNavbar
