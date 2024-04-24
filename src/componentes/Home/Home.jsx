import React from 'react'
import { io } from 'socket.io-client'
import Narvbar from '../Narvbar/Narvbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Homes.css'; // Relative path
import Button from 'react-bootstrap/Button';


//import Reportes from'../Reportes-tecnicos/Reportes-compu'


export default function Home() {


  const socket = io('http://localhost:8000');
  socket.on('connect', () => {
    console.log('conectado')

  })
  return (
    <>



      <Narvbar />
      <body>
        <div style={{ backgroundColor: 'red', display: "flex", justifyContent: "center" }}>
          <Card style={{ width: '300px', justifyItems: 'center', display: 'block', textAlign: 'center' }}>
            <Card variant="top" style={{ display: 'block', justifyItems: 'center' }} />
            <h1 className='bi bi-pc-display-horizontal' ></h1>
            <Card.Body>
              <Card.Title>Modulo de computadores</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button>Ingrese al modulo</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '300px', justifyItems: 'center', display: 'block', textAlign: 'center' }}>
            <Card variant="top" style={{ display: 'block', justifyItems: 'center' }}/>
            <h1 className="bi bi-printer"></h1>
            <Card.Body>
              <Card.Title>Modulo de impresoras</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button>Ingrese al modulo</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '300px', justifyItems: 'center', display: 'block', textAlign: 'center' }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>Modulos Reportes</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button>Ingrese al modulo</Button>
            </Card.Body>
          </Card>
        </div>
      </body>
    </>
  )

}
