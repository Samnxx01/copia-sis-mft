import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';


function Narvbar() {
  return (
    <>
    <Navbar expand="lg-expand" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/Home">SIS-MFT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavLink className={'nav-link'} to="/Home">Home</NavLink>
            <NavLink className={'nav-link'} to="/Impresoras">Impresoras</NavLink>
            <NavLink className={'nav-link'} to="/Computadores">Computadores</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Narvbar
