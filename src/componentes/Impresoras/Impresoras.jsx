import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Narvbar from '../Narvbar/Narvbar';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Navigate } from 'react-router-dom';
import userContext from '../../auth/hooks/UseContext';


export default function Impresoras() {

  const { user } = useContext(userContext)

  const [formData, setFormData] = useState({
    sedes: '',
    pisos: '',
    ip: '',
    serial: '',
    ubicacion: '',
    mac: '',
    marca: '',
    contador: '',
    fecha: ''
  });
 /* const [formDataEdi, setFormDataEdi] = useState({
    sedes: impresoras.sedes,
    pisos: impresoras.pisos,
    ip: impresoras.ip,
    serial: impresoras.serial,
    ubicacion: impresoras.ubicacion,
    mac: impresoras.mac,
    marca: impresoras.marca,
    contador: impresoras.contador,
    fecha: impresoras.fecha
  });
*/
  
  const [serial, setSerial] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [impresoras, setImpresoras] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //boton de buscar por id 
  const [showID, setShowID] = useState(false);

  const handleCloseID = () => setShowID(false);
  const handleShowID = () => setShowID(true);

  //boton de eliminar
  const [showEliminar, setEliminar] = useState(false);
  const handleCerrar = () => setEliminar(false);
  const handleShowEli = () => setEliminar(true);

  const [idEliminar, setIdEliminar] = useState('');

  const handleDeleteImpresora = (id) => {
    setEliminar(true);
    setIdEliminar(id)
  }



  //boton de modificar
  const [showModi, setModi] = useState(false);
  const [idModi, setIdModi] = useState('');
 

  const handleModificarImpresora = (id) => {
    setModi(true);
    setIdModi(id)

  }
  

  const handleCloseModi = () => setModi(false);
  const handleShowModi = () => setModi(true);


  //Logica de post de impresoras.

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

  //Logica para eliminar por ID Y SERIAL de las impresoras
  const handleEliminarClick = async (id) => {

    const impresora = impresoras.find(impresora => impresora._id === id);
    const numeroSerie = impresora.serial;

    try {

      // Enviar la solicitud DELETE a la API sisa
      const response = await fetch(`http://localhost:8000/api/inventario/eliminarImpresoras/${id}`, {
        method: 'DELETE',
      });

      //espere le muestro por postman


      // Manejar la respuesta
      if (response.status === 200) {
        // Eliminación exitosa
        alert(`Impresora "${numeroSerie}" eliminada con éxito.`);
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

 //Logica para modificar impresora
  const handleSubmitModificar = async (e, id) => {
    e.preventDefault();
    try {
      const formDataJSON = JSON.stringify(formData); // Convert formData to JSON
      const response = await fetch(`http://localhost:8000/api/inventario/modificarImpresoras/${id}`, {
        method: 'PUT',
        body: formDataJSON,
      });

      if (response.ok) {
        alert('¡Modificacion exitoso!');
        Navigate('/impresoras'); // Redirigir a la página de inicio de sesión
      } else {
        console.error('datos incorrectos');
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  //Logica para listar impresoras 
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

  //api de buscar por id-serial
  const obtenerImpresoras = async (tipoBusqueda, valorBusqueda) => {
    try {
      let url;
      if (tipoBusqueda === 'serial') {
        url = `http://localhost:8000/api/inventario/listarID/${valorBusqueda}`;
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
        setImpresoras([datos.verificarPro]); // Suponiendo un único resultado
      } else {
        console.error('API no responde o registro no encontrado.');
        setImpresoras([]); // Limpiar datos si no hay resultados
      }
    } catch (error) {
      console.error('Error al obtener impresoras:', error);
    }
  };

  return (
    <>
      <Narvbar />

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
                onChange={(e) => setSerial(e.target.value)} />
              <Button variant="success" onClick={() => obtenerImpresoras('serial', serial)}>Buscar</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <Button variant="primary" onClick={handleShow}>
        Aqui se registra la impresora
      </Button>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar impresora</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          <th>sede</th>
          <Form.Control type="text" placeholder="sede"
            id="sedes"
            name="sedes"
            autoComplete="sedes"
            value={formData.sedes}
            onChange={handleInputChange}
            required />
          <br />
          <th>piso</th>
          <Form.Control type="text" placeholder="Piso"
            id="pisos"
            name="pisos"
            autoComplete="pisos"
            value={formData.pisos}
            onChange={handleInputChange}
            required />
          <br />
          <th>ip</th>
          <Form.Control type="text" placeholder="ip obligatorio"
            id="ip"
            name="ip"
            autoComplete="ip"
            value={formData.ip}
            onChange={handleInputChange}
            required />
          <br />
          <th>serial</th>
          <Form.Control type="text" placeholder="serial"
            id="serial"
            name="serial"
            autoComplete="email"
            value={formData.serial}
            onChange={handleInputChange}
            required />
          <br />
          <th>mac</th>
          <Form.Control type="text" placeholder="Mac"
            id="mac"
            name="mac"
            autoComplete="mac"
            value={formData.mac}
            onChange={handleInputChange}
            required />
          <br />
          <th>ubicacion</th>
          <Form.Control type="text" placeholder="ubicacion"
            id="ubicacion"
            name="ubicacion"
            autoComplete="ubicacion"
            value={formData.ubicacion}
            onChange={handleInputChange}
            required />
          <br />
          <th>marca</th>
          <Form.Control type="text" placeholder="Marca"
            id="marca"
            name="marca"
            autoComplete="marca"
            value={formData.marca}
            onChange={handleInputChange}
            required />
          <br />
          <th>contador</th>
          <Form.Control type="text" placeholder="Contador"
            id="contador"
            name="contador"
            autoComplete="email"
            value={formData.contador}
            onChange={handleInputChange}
            required />
          <br />
          <th>fecha</th>
          <Form.Control type="text" placeholder="Fecha"
            id="fecha"
            name="fecha"
            autoComplete="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
            required />
          <br />
        </Modal.Body>
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
            <th>sede</th>
            <th>piso</th>
            <th>ip</th>
            <th>serial</th>
            <th>ubicacion</th>
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
              <td>{regis.ubicacion}</td>
              <td>{regis.mac}</td>
              <td>{regis.marca}</td>
              <td>{regis.contador}</td>
              <td>{regis.fecha}</td>
              <Button variant="danger" onClick={() => {
                handleDeleteImpresora(regis._id)
              }}>
                Eliminar
              </Button>

              <Button variant="info" onClick={() => {
                handleModificarImpresora(regis._id)
              }}>
                Modificar
              </Button>
            </tr>

          ))}
        </tbody>

        <Modal show={showModi} onHide={handleCloseModi}>
          <Modal.Header closeButton>
            <Modal.Title>Quieres modificar?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <br />
            <th>sede</th>
            <Form.Control type="text" placeholder="sede"
              id="sedes"
              name="sedes"
              autoComplete="sedes"
              value={formData.sedes}
              onChange={handleInputChange}
              required />

            <br />
            <th>piso</th>
            <Form.Control type="text" placeholder="Piso"
              id="pisos"
              name="pisos"
              autoComplete="pisos"
              value={formData.pisos}
              onChange={handleInputChange}
              required />
            <br />
            <th>ip</th>
            <Form.Control type="text" placeholder="ip obligatorio"
              id="ip"
              name="ip"
              autoComplete="ip"
              value={formData.ip}
              onChange={handleInputChange}
              required />
            <br />
            <th>serial</th>
            <Form.Control type="text" placeholder="serial"
              id="serial"
              name="serial"
              autoComplete="email"
              value={formData.serial}
              onChange={handleInputChange}
              required />
            <br />
            <th>mac</th>
            <Form.Control type="text" placeholder="Mac"
              id="mac"
              name="mac"
              autoComplete="mac"
              value={formData.mac}
              onChange={handleInputChange}
              required />
            <br />
            <th>ubicacion</th>
            <Form.Control type="text" placeholder="ubicacion"
              id="ubicacion"
              name="ubicacion"
              autoComplete="ubicacion"
              value={formData.ubicacion}
              onChange={handleInputChange}
              required />
            <br />
            <th>marca</th>
            <Form.Control type="text" placeholder="Marca"
              id="marca"
              name="marca"
              autoComplete="marca"
              value={formData.marca}
              onChange={handleInputChange}
              required />
            <br />
            <th>contador</th>
            <Form.Control type="text" placeholder="Contador"
              id="contador"
              name="contador"
              autoComplete="email"
              value={formData.contador}
              onChange={handleInputChange}
              required />
            <br />
            <th>fecha</th>
            <Form.Control type="text" placeholder="Fecha"
              id="fecha"
              name="fecha"
              autoComplete="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              required />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModi}>
              Cerrar
            </Button>
            <Button variant="success" onClick={(e)=>handleSubmitModificar(e, idModi)}>
              Modificado
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showEliminar} onHide={handleCerrar}>
          <Modal.Header>
            <Modal.Title>¿Quiere eliminar impresora?</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Estas seguro de eliminar?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCerrar}>
              Close
            </Button>
            <Button variant="danger" onClick={() => {
              handleEliminarClick(idEliminar)
            }}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>

      </Table>
    </>
  );
}
