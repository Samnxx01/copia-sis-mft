import React, { useState, useEffect, useContext } from 'react';
import Narvbar from '../Narvbar/Narvbar'
import userContext from '../../auth/hooks/UseContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';


export default function Computadores() {

  const { user } = useContext(userContext)

  const [formData, setFormData] = useState({
    fecha: '',
    sede: '',
    ubicacion: '',
    area: '',
    marca: '',
    nombre_equipo: '',
    sistema_operativo: '',
    placa: '',
    disco_duro: '',
    memoria_ram: '',
    serial: '',
    mac: '',
    ip: '',
    usuario: '',
    clave: '',
    nombre_asignado: '',
    cedula: '',
    dominio: '',
    fecha_mantenimiento: '',
    tecnico: '',
    observaciones: '',
  });

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

      const response = await fetch('http://localhost:8000/api/inventario/guardarComputador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'codificado': ''
        },
        body: JSON.stringify({
          ...formData,
          id

        }),
      });

      if (response.ok) {
        alert('¡Registro exitoso!');
        Navigate('/Computadores'); // Redirigir a la página de inicio de sesión
      } else {
        console.error('datos incorrectos');
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };


  return (
    <>
      <Narvbar />
      <Button variant="primary" onClick={handleShow}>
        Aqui agregas el computador
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quieres ingresar un computador?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <th>Fecha</th>
              <Form.Control type="text" placeholder="fecha"
                id="fecha"
                name="fecha"
                autoComplete="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Sede</th>
              <Form.Control type="text" placeholder="sede"
                id="sede"
                name="sede"
                autoComplete="sede"
                value={formData.sede}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Ubicacion</th>
              <Form.Control type="text" placeholder="ubicacion"
                id="ubicacion"
                name="ubicacion"
                autoComplete="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Area</th>
              <Form.Control type="text" placeholder="area"
                id="area"
                name="area"
                autoComplete="area"
                value={formData.area}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Marca</th>
              <Form.Control type="text" placeholder="marca"
                id="marca"
                name="marca"
                autoComplete="marca"
                value={formData.marca}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Nombre equipo</th>
              <Form.Control type="text" placeholder="nombre equipo"
                id="nombre_equipo"
                name="nombre_equipo"
                autoComplete="nombre_equipo"
                value={formData.nombre_equipo}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Sistema operativo</th>
              <Form.Control type="text" placeholder="sistema operativo"
                id="sistema_operativo"
                name="sistema_operativo"
                autoComplete="sistema_operativo"
                value={formData.sistema_operativo}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Placa</th>
              <Form.Control type="text" placeholder="Placa"
                id="placa"
                name="placa"
                autoComplete="placa"
                value={formData.placa}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Disco Duro</th>
              <Form.Control type="text" placeholder="disco duro"
                id="disco_duro"
                name="disco_duro"
                autoComplete="disco_duro"
                value={formData.disco_duro}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Memoria ram</th>
              <Form.Control type="text" placeholder="Memoria ram"
                id="memoria_ram"
                name="memoria_ram"
                autoComplete="memoria_ram"
                value={formData.memoria_ram}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Serial</th>
              <Form.Control type="text" placeholder="Serial"
                id="serial"
                name="serial"
                autoComplete="serial"
                value={formData.serial}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Mac</th>
              <Form.Control type="text" placeholder="Mac"
                id="mac"
                name="mac"
                autoComplete="mac"
                value={formData.mac}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Ip</th>
              <Form.Control type="text" placeholder="ip"
                id="ip"
                name="ip"
                autoComplete="ip"
                value={formData.ip}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Usuario</th>
              <Form.Control type="text" placeholder="Usuario"
                id="usuario"
                name="usuario"
                autoComplete="usuario"
                value={formData.usuario}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Clave</th>
              <Form.Control type="text" placeholder="Clave"
                id="clave"
                name="clave"
                autoComplete="clave"
                value={formData.clave}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Nombre asignado</th>
              <Form.Control type="text" placeholder="Nombre asignado"
                id="nombre_asignado"
                name="nombre_asignado"
                autoComplete="nombre_asignado"
                value={formData.nombre_asignado}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Cedula</th>
              <Form.Control type="text" placeholder="cedula"
                id="cedula"
                name="cedula"
                autoComplete="cedula"
                value={formData.cedula}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Fecha de mantenimiento</th>
              <Form.Control type="text" placeholder="fecha mantenimiento"
                id="fecha_mantenimiento"
                name="fecha_mantenimiento"
                autoComplete="fecha_mantenimiento"
                value={formData.fecha_mantenimiento}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>tecnico</th>
              <Form.Control type="text" placeholder="Tecnico"
                id="tecnico"
                name="tecnico"
                autoComplete="tecnico"
                value={formData.tecnico}
                onChange={handleInputChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Dominio</th>
              <Form.Select aria-label="Dominio" name="dominio" value={formData.dominio} onChange={handleInputChange}>
                <option value="">Seleccione el dominio</option>
                <option value="SI">Si</option>
                <option value="NO">No</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <th>Observaciones</th>
              <Form.Control type="text" placeholder="Observaciones"
                id="observaciones"
                name="observaciones"
                autoComplete="observaciones"
                value={formData.observaciones}
                onChange={handleInputChange}
                required />
            </Form.Group>
          </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
