import React, { useEffect, useState } from 'react'
import Narvbar from '../Narvbar/Narvbar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';



export default function Reportescompu() {

  /*const [formData, setFormData] = useState({
  fecha: '',
  numero_caso: '',
  computadores: '',
  impresoras: '',
  registUros: '',
  marca: '',
  modelo: '',
  serial_parte: '',
  fecha_instalacion: '',
  bajas: ''
});*/



const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  const id = e.target.id.value;

  try {

    const response = await fetch('http://localhost:8000/api/inventario/guardarimpresoras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'codificado': ''
      },
      body: JSON.stringify({
        ...formData,
        id,
      }),
    });

    if (response.ok) {
      alert('¡Registro exitoso!');
      Navigate('/impresoras'); // Redirigir a la página de inicio de sesión
    } else {
      console.error('datos incorrectos');
      alert('Error en el registro');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};
useEffect(() => {
  const fetchComputadores = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/inventario/listarcompu', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      // Ensure data has the expected structure and property
      if (data && data.listarCompu) {
        setComputadores(data.listarCompu);
      } else {
        console.error('la api no responde.');
        // Handle the case where the API data is missing or has an unexpected structure
      }
    } catch (error) {
      console.error('Error fetching impresoras:', error);
    }
  };

  fetchComputadores();
}, []);

/*useEffect(() => {
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
}, []);*/
  return (
    <>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reportes</title>
    </head>
    <body>
    <Narvbar />
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFecha">
            <Form.Label><th>Fecha</th></Form.Label>
            <Form.Control type="text" placeholder="Fecha de registro" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNumerodecaso">
            <Form.Label ><th>N.Caso</th></Form.Label>
            <Form.Control type="text" placeholder="Numero de caso" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <th className="mb-3">Datos del usuario</th>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label><th>Nombre Completo</th></Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Cedula</th></Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label><th>Correo electronico</th></Form.Label>
            <Form.Control type="text" placeholder="Correo electronico" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Area</th></Form.Label>
            <Form.Control type="text" placeholder="Area" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Extension</th></Form.Label>
            <Form.Control type="text" placeholder="Extension" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <th className="mb-3">Datos del equipo</th>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label><th>Tipo de equipo</th></Form.Label>
            <Form.Control type="text" placeholder="Tipo de equipo" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Marca equipo</th></Form.Label>
            <Form.Control type="text" placeholder="Marca equipo" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Serial</th></Form.Label>
            <Form.Control type="text" placeholder="Serial" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Mac</th></Form.Label>
            <Form.Control type="text" placeholder="Mac" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Equipo de garantia</th></Form.Label>
            <Form.Control type="text" placeholder="Equipo de garantia" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <th className="mb-3" >Datos del ingeniero</th>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label><th>Nombre Completo</th></Form.Label>
            <Form.Control type="text" placeholder="Nombre Completo" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Correo Electronico</th></Form.Label>
            <Form.Control type="text" placeholder="Correo Electronico" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Telefono/extension</th></Form.Label>
            <Form.Control type="text" placeholder="Telefono/extension" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Celular</th></Form.Label>
            <Form.Control type="text" placeholder="Celular" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <th className="mb-3">Datos de la partes instaladas</th>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label><th>Marca</th></Form.Label>
            <Form.Control type="text" placeholder="Marca" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Modelo</th></Form.Label>
            <Form.Control type="text" placeholder="Modelo" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Serial de la parte</th></Form.Label>
            <Form.Control type="text" placeholder="Serial de la parte" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Fecha de instalacion</th></Form.Label>
            <Form.Control type="text" placeholder="Fecha de instalacion" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <th className="mb-3">Datos de la parte defectuosa</th>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label><th>Tipo de parte</th></Form.Label>
            <Form.Control type="text" placeholder="Tipo de parte" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Serial de parte</th></Form.Label>
            <Form.Control type="text" placeholder="Serial de parte" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <th className="mb-3">Se seguiere dar baja</th>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label><th>Tipo de parte</th></Form.Label>
            <Form.Control type="text" placeholder="Tipo de parte" />
          </Form.Group>
          
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label><th>Serial de parte</th></Form.Label>
            <Form.Control type="text" placeholder="Serial de parte" />
          </Form.Group>

        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label><th>Diagnostico de elemento</th></Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Row>

        <Row className="mb-3">

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label><th></th></Form.Label>
            <Form.Control type="text" placeholder="Activos Fijos" />
            <th>Activos Fijos</th>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label></Form.Label>
            <Form.Control type="text" placeholder="Coordinador de soporte" />
            <th>Coordinador de soporte</th>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </body>
    </html>

    </>

  )
}
