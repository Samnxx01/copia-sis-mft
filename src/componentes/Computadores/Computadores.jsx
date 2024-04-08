import React from 'react'
import Form from 'react-bootstrap/Form';
import Narvbar  from '../Narvbar/Narvbar'

export default function Computadores() {
  return (
    <>
    <Narvbar/>
        <Form className="mb-3 col-2">
      <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInput1">
        <Form.Label>sede</Form.Label>
        <Form.Control className="mb-3 text-center" type="text" placeholder="Sedes" />
      </Form.Group>
      <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInput1">
        <Form.Label >ubicacion</Form.Label>
        <Form.Control className="mb-3 text-center" type="text" placeholder="Ubicacion" />
      </Form.Group>
      <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInput1">
        <Form.Label>area</Form.Label>
        <Form.Control className="mb-3 text-center" type="text" placeholder="Area" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>marca</Form.Label>
        <Form.Control type="text" placeholder="Marca" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>nombre_equipo</Form.Label>
        <Form.Control type="text" placeholder="Nombre equipo" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>placa</Form.Label>
        <Form.Control type="text" placeholder="Placa" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>sistema_operativo</Form.Label>
        <Form.Control type="text" placeholder="El sistema operativo es requerido" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>disco duro</Form.Label>
        <Form.Control type="text" placeholder="El disco duro es requerido" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>memoria ram</Form.Label>
        <Form.Control type="text" placeholder="La memoria Ram es requerida" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>serial</Form.Label>
        <Form.Control type="text" placeholder="La serial es requerida"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>mac</Form.Label>
        <Form.Control type="text" placeholder="La mac" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>ip</Form.Label>
        <Form.Control type="text" placeholder="La ip es requerida" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>usuario</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>clave</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>nombre asignado</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>dominio</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Observacion</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
    </>
  )
}
