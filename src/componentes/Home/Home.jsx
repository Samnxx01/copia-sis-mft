import React, { useState, useEffect } from 'react';
import Impresorass from '../Impresoras/Impresoras'
import Login from '../../auth/Login/Login'
import Narvbar from '../Narvbar/Narvbar'
import { io } from 'socket.io-client'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

//import Reportes from'../Reportes-tecnicos/Reportes-compu'

export default function Home() {

  const socket = io('http://localhost:8000');

  const [computadoress, setComputadores] = useState([]);

  socket.on('connect', () => {
    console.log('conectado')

  })
  const [showEliminar, setShowEliminar] = useState(false);

  /*const [SeleccionarModificar, setModificar] = useState({
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

  })*/

  const handleClose = () => setShowEliminar(false);
  const handleShow = () => setShowEliminar(true);

  const [idEliminar, setIdEliminar] = useState('');

  const handleDeleteComputador = (id) => {
    setShowEliminar(true);
    setIdEliminar(id)
  }

  const handleEliminarClick = async (id) => {

    const computer = computadoress.find(computer => computer._id === id);
    const numeroSerie = computer.serial;
    console.log(computer)

    try {

      // Enviar la solicitud DELETE a la API sisa
      const response = await fetch(`http://localhost:8000/api/inventario/eliminarComputadores/${id}`, {
        method: 'DELETE',
      });

      // Manejar la respuesta
      if (response.status === 200) {
        // Eliminación exitosa
        alert(`Computadores "${numeroSerie}" eliminada con éxito.`);
      } else {
        // Error al eliminar
        const data = await response.json();
        const mensajeError = data.msg || 'Error al eliminar la impresora.';
        alert(mensajeError);
      }
    } catch (error) {
      // Error inesperado
      console.error('Error al eliminar la impresora:', error.message);
      alert('Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.');
    }
  };


  useEffect(() => {
    const fetchImpresoras = async () => {
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

    fetchImpresoras();
  }, []);



  return (
    <>
      <Narvbar />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>fecha</th>
            <th>sede</th>
            <th>ubicacion</th>
            <th>nombre equipo</th>
            <th>sistema operativo</th>
            <th>placa</th>
            <th>disco duro</th>
            <th>memoria ram</th>
            <th>ip</th>
            <th>serial</th>
            <th>mac</th>
            <th>marca</th>
            <th>usuario</th>
            <th>clave</th>
            <th>nombre asignado</th>
            <th>cedula</th>
            <th>fecha mantenimiento</th>
            <th>tecnico</th>
            <th>dominio</th>
            <th>observacion</th>
          </tr>
        </thead>
        <tbody>
          {!computadoress.length && <p>Loading impresoras...</p>} {/* Conditional rendering while data is loading */}
          {computadoress.map((regis, index) => (
            <tr key={index}>
              <td>{regis.fecha}</td>
              <td>{regis.sede}</td>
              <td>{regis.ubicacion}</td>
              <td>{regis.nombre_equipo}</td>
              <td>{regis.sistema_operativo}</td>
              <td>{regis.placa}</td>
              <td>{regis.disco_duro}</td>
              <td>{regis.memoria_ram}</td>
              <td>{regis.ip}</td>
              <td>{regis.serial}</td>
              <td>{regis.mac}</td>
              <td>{regis.marca}</td>
              <td>{regis.usuario}</td>
              <td>{regis.clave}</td>
              <td>{regis.nombre_asignado}</td>
              <td>{regis.cedula}</td>
              <td>{regis.fecha_mantenimiento}</td>
              <td>{regis.tecnico}</td>
              <td>{regis.dominio}</td>
              <td>{regis.observaciones}</td>
              <Button variant="danger" onClick={() => {
                handleDeleteComputador(regis._id)
              }}>
                Eliminar
              </Button>
            </tr>
          ))}
        </tbody>
        <Modal show={showEliminar} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>¿Quieres Eliminar computador?</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Estas seguro de eliminar?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>{
              handleEliminarClick(idEliminar)
            }}>
             Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </Table>

    </>
  )
}
