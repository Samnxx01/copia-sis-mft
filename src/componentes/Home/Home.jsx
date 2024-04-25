import React from 'react'
import { io } from 'socket.io-client'
import Narvbar from '../Narvbar/Narvbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Homes.css'; // Relative path
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


//import Reportes from'../Reportes-tecnicos/Reportes-compu'


export default function Home() {


  const socket = io('http://localhost:8000');
  socket.on('connect', () => {
    console.log('conectado')

  })
  const navigate = useNavigate();

  const enviarComputadores = () => {
    navigate('/Computadores');
  };
  const enviarImpresoras = () => {
    navigate('/Impresoras');
  };
  const enviarReportes = () => {
    navigate('/Reportes');
  };
  return (
    <>
    <Narvbar/>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Home</title>
    </head>
    
    <body style={{backgroundColor:'green', height:"897px"}} >
      <h2 style={{textAlign:'center'}}><label>Departamento sistemas de clinica uros  a continuacion tienes que seleccionar el modulo de tu uso:</label></h2>
      <div  style={{justifyContent: 'center', textAlign: 'center', display: 'flex', padding: "50px"}} > 
        <Card  variant="top" style={{ width: '300px', justifyItems: 'center', display: 'block', textAlign: 'center', marginRight:"50px"}} >
            <h1 className='bi bi-pc-display-horizontal' ></h1>
            <Card.Body>
              <Card.Title style={{marginTop:'40px'}}>Modulo de computadores</Card.Title>
            </Card.Body>
            <Card.Body>
              <Button style={{height:'70px', marginTop:'70px'}} onClick={enviarComputadores}>Ingrese al modulo</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '300px', justifyItems: 'center', display: 'block', textAlign: 'center' }}>
          
            <h1 className="bi bi-printer"></h1>
            <Card.Body>
              <Card.Title  style={{marginTop:'40px'}}>Modulo de impresoras</Card.Title>
            </Card.Body>
            <Card.Body>
              <Button style={{height:'70px', marginTop:'70px'}} onClick={enviarImpresoras}>Ingrese al modulo</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '300px', justifyItems: 'center', display: 'block', textAlign: 'center', marginLeft:"50px" }}>
            <h1 className='bi bi-file'></h1>
            <Card.Body>
              <Card.Title style={{marginTop:'40px'}}>Modulos Reportes</Card.Title>
            </Card.Body>
            <Card.Body>
              <Button style={{height:'70px', marginTop:'70px'}} onClick={enviarReportes}>Ingrese al modulo</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '300px', justifyItems: 'center', display: 'block', textAlign: 'center', marginLeft:"50px" }}>
            <h1 className='bi bi-upc-scan'></h1>
           <Card.Body>
             <Card.Title style={{marginTop:'40px'}}>Modulos Escaner</Card.Title>
           </Card.Body>
           <Card.Body>
             <Button style={{height:'70px', marginTop:'70px'}}>Ingrese al modulo</Button>
           </Card.Body>
         </Card>
        </div>
    </body>
    </html>
    </>
  )

}
