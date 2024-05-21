import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import userContext from '../../auth/hooks/UseContext';
import { useNavigate } from 'react-router-dom';





function Narvbar() {
  const {cerrarSesion} = useContext(userContext)
   const navigate = useNavigate();

      const enviarMenu = () => {
      navigate('/');
    };

  return (
    <>
    <Navbar  expand="lg-expand"   bg="primary" data-bs-theme="primary" >
      <Container>
        <Navbar.Brand bg="primary" href="/Home">SIS-MFT</Navbar.Brand>
            <Button style={{fontSize:'20px'}} className='bi bi-box-arrow-left' onClick={() =>{
              enviarMenu()
              cerrarSesion()
            }}></Button>
      </Container>
    </Navbar>
    </>
  )
}

export default Narvbar
