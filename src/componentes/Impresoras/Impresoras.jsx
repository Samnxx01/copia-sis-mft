import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Narvbar from '../Narvbar/Narvbar';
import Form from 'react-bootstrap/Form';

export default function Impresoras() {
  const [impresoras, setImpresoras] = useState([]);

  useEffect(() => {
    const fetchImpresoras = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/inventario/listarimpresoras', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        // Ensure data has the expected structure and property
        if (data && data.registrosImpreso) {
          setImpresoras(data.registrosImpreso);
        } else {
          console.error('la api no responde.');
          // Handle the case where the API data is missing or has an unexpected structure
        }
      } catch (error) {
        console.error('Error fetching impresoras:', error);
      }
    };

    fetchImpresoras();
  }, []);

  return (
    <>

    <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      <Narvbar/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>sede</th>
            <th>piso</th>
            <th>ip</th>
            <th>serial</th>
            <th>mac</th>
            <th>marca</th>
            <th>contador</th>
            <th>fecha</th>
            
          </tr>
        </thead>
        <tbody>
          {!impresoras.length && <p>Loading impresoras...</p>} {/* Conditional rendering while data is loading */}
          {impresoras.map((regis, index) => (
            <tr key={index}>
              <td>{regis.sedes}</td>
              <td>{regis.pisos}</td>
              <td>{regis.ip}</td>
              <td>{regis.serial}</td>
              <td>{regis.mac}</td>
              <td>{regis.marca}</td>
              <td>{regis.contador}</td>
              <td>{regis.fecha}</td>
              <Button className="btn btn-success">Success</Button>{' '}             
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
