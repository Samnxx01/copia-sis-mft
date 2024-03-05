import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import userContext from '../../auth/hooks/UseContext';


function Narvbar() {
  const {cerrarSesion} = useContext(userContext)
  return (
    <>
    <Navbar expand="lg-expand" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/Home">SIS-MFT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Button onClick={() =>{
              cerrarSesion()
            }}>Logout</Button>
          <NavLink className={'nav-link'} to="/Reportes">Reportes</NavLink>
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
