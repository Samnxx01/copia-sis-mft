import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Narvbar from '../Narvbar/Narvbar';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Navigate } from 'react-router-dom';

export default function Impresoras() {

  const [formData, setFormData] = useState({
    sedes: '',
    pisos: '',
    ip: '',
    serial: '',
    ubicacion: '',
    mac: '',
    marca:'',
    contador: '',
    fecha: ''
});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
  };
    
  const [impresoras, setImpresoras] = useState([]);
  const [show, setShow] = useState(false);
  const [showEliminar, setEliminar] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleCerrar = () => setEliminar(false);
  const handleShowEli = () => setEliminar(true);
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
        const response = await fetch('http://localhost:8000/api/inventario/guardarimpresoras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'metasploit': ''
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('¡Registro exitoso!');
            navigate('/Login'); // Redirigir a la página de inicio de sesión
        } else {
            console.error('datos incorrectos');
            alert('Error en el registro');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};
const handleEliminarClick = async () => {
  try {
    // Obtener el ID de la impresora
    const impresoraId = impresoras._id;

    // Enviar la solicitud DELETE a la API
    const response = await fetch(`http://localhost:8000/api/inventario/eliminarImpresoras/${impresoraId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Reemplazar "token" con el token de seguridad real
      },
    });

    // Manejar la respuesta
    if (response.status === 200) {
      // Eliminación exitosa
      onEliminarImpresora(impresoraId); // Actualizar la interfaz de usuario
      alert(`Impresora "${impresoras.serial}" eliminada con éxito.`);
      closeModal(); // Cerrar el modal de eliminación
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
  <Narvbar/>  
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
           required/>
          
          <br />
          <th>piso</th>
          <Form.Control type="text" placeholder="Piso"
           id="pisos"
           name="pisos"
           autoComplete="pisos"
           value={formData.pisos}
           onChange={handleInputChange}
           required/>
          <br />
          <th>ip</th>
          <Form.Control type="text" placeholder="ip obligatorio"                                     
           id="ip"
           name="ip"
           autoComplete="ip"
           value={formData.ip}
           onChange={handleInputChange}
           required/>
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
              <Button variant="danger" onClick={handleShowEli}>
                Eliminar
              </Button> 
            </tr>
          ))}
        </tbody>
        <Modal show={showEliminar} onHide={handleCerrar}>
                <Modal.Header closeButton>
                  <Modal.Title>Quiere eliminar imrpesora?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Estas seguro de eliminar</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCerrar}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={handleEliminarClick}>
                    Eliminar
                  </Button>
                </Modal.Footer>
              </Modal>
      </Table>
    </>
  );
}
