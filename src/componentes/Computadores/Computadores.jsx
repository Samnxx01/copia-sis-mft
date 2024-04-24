import React, { useState, useEffect, useContext } from 'react';
import Narvbar from '../Narvbar/Narvbar'
import userContext from '../../auth/hooks/UseContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


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

  const [computadoress, setComputadores] = useState([]);
  const [serial, setSerial] = useState('');
  const [ip, setIp] = useState('');
  const handleCloseID = () => setShowID(false);
  const handleShowID = () => setShowID(true);
  const [showID, setShowID] = useState(false);

  const [showEliminar, setShowEliminar] = useState(false);
  const [idEliminar, setIdEliminar] = useState('');
  const handleCloseEli = () => setShowEliminar(false);
  const handleShowEli = () => setShowEliminar(true);
  

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

  const obtenerComputadores = async (tipoBusqueda, valorBusqueda) => {
    try {
      let url;
      if (tipoBusqueda === 'serial') {
        url = `http://localhost:8000/api/inventario/computador/listarID/${valorBusqueda}`;
      } else {
        console.error('Tipo de búsqueda inválido:', tipoBusqueda);
        return; // Manejar el tipo de búsqueda inválido
      }

      const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const datos = await respuesta.json();

      if (datos && datos.verificarPro) {
        setComputadores([datos.verificarPro]); // Suponiendo un único resultado
      } else {
        console.error('API no responde o registro no encontrado.');
        setComputadores([]); // Limpiar datos si no hay resultados
      }
    } catch (error) {
      console.error('Error al obtener impresoras:', error);
    }
  };
  
  const obtenerComputadoresIP = async (tipoBusqueda, valorBusqueda) => {
    try {
      let url;
      if (tipoBusqueda === 'ip') {
        url = `http://localhost:8000/api/inventario/computador/listarIP/${valorBusqueda}`;
      } else {
        console.error('Tipo de búsqueda inválido:', tipoBusqueda);
        return; // Manejar el tipo de búsqueda inválido
      }

      const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const datos = await respuesta.json();

      if (datos && datos.verificarPro) {
        setComputadores([datos.verificarPro]); // Suponiendo un único resultado
      } else {
        console.error('API no responde o registro no encontrado.');
        setComputadores([]); // Limpiar datos si no hay resultados
      }
    } catch (error) {
      console.error('Error al obtener impresoras:', error);
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
      <Button variant="success" onClick={handleShowID}>
        Listar por SERIAL
      </Button>

      <Modal show={showID} onHide={handleCloseID}>
        <Modal.Header closeButton>
          <Modal.Title>Buscar por SERIAL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ingrese el serial</Form.Label>
              <Form.Control
                type="text"
                placeholder="serial"
                value={serial}
                onChange={(e) => setSerial(e.target.value) } />
              <Button variant="success" onClick={() => obtenerComputadores('serial', serial)}>Buscar</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Header closeButton>
          <Modal.Title>Buscar por IP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label><th>Ingrese la ip</th></Form.Label>
              <Form.Control
                type="text"
                placeholder="ip"
                value={ip}
                onChange={(e) => setIp(e.target.value) } />
              <Button variant="success" onClick={() => obtenerComputadoresIP('ip', ip)}>Buscar</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
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
        <Modal show={showEliminar} onHide={handleCloseEli}>
          <Modal.Header closeButton>
            <Modal.Title>¿Quieres Eliminar computador?</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Estas seguro de eliminar?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEli}>
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
