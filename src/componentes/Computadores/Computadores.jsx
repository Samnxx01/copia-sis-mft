import React, { useState, useEffect, useContext } from 'react';
import Narvbar from '../Narvbar/Narvbar'
import userContext from '../../auth/hooks/UseContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable';
import imgs from '../../../public/img/clinicauros.jpg'




export default function Computadores() {

  const { user } = useContext(userContext)
  const navigate = useNavigate();



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
    img: ''
  });

  const [computadoress, setComputadores] = useState([]);
  const [seleccionaModificacion, setSeleccionModificacion] = useState({})
  const [serial, setSerial] = useState('');
  const [ip, setIp] = useState('');
  const handleCloseID = () => setShowID(false);
  const handleShowID = () => setShowID(true);
  const [showID, setShowID] = useState(false);
  const [idModi, setIdModi] = useState('');
  const [showEliminar, setShowEliminar] = useState(false);
  const [idEliminar, setIdEliminar] = useState('');
  const handleCloseEli = () => setShowEliminar(false);
  const handleShowEli = () => setShowEliminar(true);
  const [showModi, setModi] = useState(false);

  const inputRefIP = useRef(null);

  const handleModificarCompu = (id) => {
    const seleccionaModificacion = computadoress.find(compus => compus._id === id);
    setSeleccionModificacion(seleccionaModificacion);
    setFormData(seleccionaModificacion);
    setModi(true);
    setIdModi(id);
  };

  const handleCloseModi = () => setModi(false);


  const handleDeleteComputador = (id) => {
    setShowEliminar(true);
    setIdEliminar(id)
  }

  const handleKeyPressIP = (event) => {
    if (event.key === 'Enter') {
      obtenerComputadores('ip', ip);
    }
  };


  const handleEliminarClick = async (id) => {

    const computer = computadoress.find(computer => computer._id === id);
    const numeroSerie = computer.serial;
    try {

      // Enviar la solicitud DELETE a la API sisa
      const response = await fetch(`http://localhost:8000/api/inventario/eliminarComputadora/${id}`, {
        method: 'DELETE',
      });

      // Manejar la respuesta
      if (response.status === 200) {
        // Eliminación exitosa
        alert(`Computadores "${numeroSerie}" eliminada con éxito.`);
        console.log('Buscar clicked (or keyboard key pressed)');
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

      // Evaluar el tipo de búsqueda y construir la URL correspondiente
      if (tipoBusqueda === 'serial') {
        url = `http://localhost:8000/api/inventario/compu/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'mac') {
        url = `http://localhost:8000/api/inventario/compu/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'ubicacion') {
        url = `http://localhost:8000/api/inventario/compu/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'ip') {
        url = `http://localhost:8000/api/inventario/compu/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'sede') {
        url = `http://localhost:8000/api/inventario/compu/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'mac') {
        url = `http://localhost:8000/api/inventario/compu/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'area') {
        url = `http://localhost:8000/api/inventario/compu/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'placa') {
        url = `http://localhost:8000/api/inventario/compu/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'marca') {
        url = `http://localhost:8000/api/inventario/compu/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'cedula') {
        url = `http://localhost:8000/api/inventario/compu/listarID/${valorBusqueda}`;
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

      if (datos && datos.compuVeri) {
        setComputadores([datos.compuVeri]); // Suponiendo un único resultado
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
        url = `http://localhost:8000/api/inventario/compu/listarIP/${valorBusqueda}`;
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

  //CLICK CON TECLADO
  const inputRefSerial = useRef(null);
  const handleKeyPressSerial = (event) => {
    if (event.key === 'Enter') {
      obtenerComputadores('serial', serial);
    }
  };



  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [archivo, setArchivo] = useState(null);

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };


const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivo) {
      console.error('No hay archivo para subir');
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append('archivo', archivo);

    try {
      const response = await fetch('http://localhost:8000/api/inventario/guardarComputador', {
        method: 'POST',
        body: formDataToSend,
      });
      console.log(formDataToSend)

      if (response.ok) {
        alert('¡Registro exitoso!');
        // Redirigir a la página de computadores
      } else {
        console.error('Error en el registro');
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  const handleSubmitModificar = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/inventario/modificarComputadora/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'codificado': ''
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('¡Modificación exitosa!');
        Navigate('/impresoras'); // Redirigir a la página de impresoras
      } else {
        console.error('Datos incorrectos');
        alert('Error en la modificación');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  /*const handleSubmitIMG = async (event) => {
    event.preventDefault();

    if (!archivo) {
      console.error('No hay archivo para subir');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('archivo', archivo); // Agregar el archivo al FormData

      // Enviar el FormData al servidor
      const response = await fetch('http://localhost:8000/api/documentos/subirarchivosDB', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir el archivo');
      }
      alert('Subido el archivo')
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };*/

  const [selectedFile, setSelectedFile] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const enviarMenu = () => {
    navigate('/Home');
  };
  const columns = [
    { field: 'id', headerName: 'id', width: 130 },
    { field: 'fecha', headerName: 'FECHA', width: 130 },
    { field: 'sede', headerName: 'SEDES', width: 130 },
    { field: 'ubicacion', headerName: 'UBICACION', width: 130 },
    { field: 'area', headerName: 'AREA', width: 130 },
    { field: 'marca', headerName: 'MARCA', width: 130 },
    { field: 'nombre_equipo', headerName: 'NOMBRE EQUIPO', width: 130 },
    { field: 'sistema_operativo', headerName: 'SISTEMA OPERATIVO', width: 130 },
    { field: 'placa', headerName: 'PLACA', width: 130 },
    { field: 'disco_duro', headerName: 'DISCO DURO', width: 130 },
    { field: 'memoria_ram', headerName: 'MEMORIA RAM', width: 130 },
    { field: 'serial', headerName: 'SERIAL', width: 130 },
    { field: 'mac', headerName: 'MAC', width: 130 },
    { field: 'ip', headerName: 'IP', width: 130 },
    { field: 'usuario', headerName: 'USUARIO', width: 130 },
    { field: 'clave', headerName: 'CLAVE', width: 130 },
    { field: 'nombre_asignado', headerName: 'NOMBRE ASIGNADO', width: 130 },
    { field: 'cedula', headerName: 'CEDULA', width: 130 },
    { field: 'dominio', headerName: 'DOMINIO', width: 130 },
    { field: 'fecha_mantenimiento', headerName: 'FECHA MANTENIMIENTO', width: 130 },
    { field: 'tecnico', headerName: 'TECNICO', width: 130 },
    { field: 'observaciones', headerName: 'OBSERVACION', width: 130 },
    { field: 'img', headerName: 'IMG', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <>
          <Button variant="danger" onClick={() => { handleDeleteComputador(params.row.id) }} >Eliminar</Button>
          <Button variant="info" onClick={() => handleModificarCompu(params.row.id)}>Modificar</Button>
        </>
      ),
    },
  ];
  const rows = computadoress.map((regis) => ({
    id: regis._id,
    fecha: regis.fecha,
    sede: regis.sede,
    ubicacion: regis.ubicacion,
    area: regis.area,
    marca: regis.marca,
    nombre_equipo: regis.nombre_equipo,
    sistema_operativo: regis.sistema_operativo,
    placa: regis.placa,
    disco_duro: regis.disco_duro,
    memoria_ram: regis.memoria_ram,
    serial: regis.serial,
    mac: regis.mac,
    ip: regis.ip,
    usuario: regis.usuario,
    clave: regis.clave,
    nombre_asignado: regis.nombre_asignado,
    cedula: regis.cedula,
    dominio: regis.dominio,
    fecha_mantenimiento: regis.fecha_mantenimiento,
    tecnico: regis.tecnico,
    observaciones: regis.observaciones,
    img: regis.img,
  }));
  const generatePDF = () => {
    const doc = new jsPDF()
                                  


    /* impresoras.forEach((impresora, index) => {
       y += 10; // Incrementar la posición vertical para cada impresora
       // Agregar los datos de cada impresora al PDF
       doc.text('Tabla de impresoras', 15,5)
       doc.text(`Impresora :`, 10, y);
       doc.text(`Sedes: ${impresora.sedes}`, 10, y + 10);
       doc.text(`Pisos: ${impresora.pisos}`, 10, y + 20);
       doc.text(`IP: ${impresora.ip}`, 10, y + 30);
       doc.text(`Serial: ${impresora.serial}`, 10, y + 40);
       doc.text(`Ubicacion: ${impresora.ubicacion}`, 10, y + 50);
       doc.text(`MAC: ${impresora.mac}`, 10, y + 60);
       doc.text(`Marca: ${impresora.marca}`, 10, y + 70);
       doc.text(`Contador: ${impresora.contador}`, 10, y + 80);
       doc.text(`Fecha: ${impresora.fecha}`, 10, y + 90);
   });*/
    //crear tablas 


    doc.autoTable({

      head: [['Fecha','Sedes', 'Ubicacion','Area','Marca','Nombre_equipo','Sistema Operativo','Placa','Disco Duro', 'Memoria Ram','IP', 'Serial', 'MAC', 'Usuario', 'Clave', 'Nombre_asignado', 'Cedula', 'Dominio', 'Fecha Mantenimiento', 'Técnico', 'Observaciones', 'Imagen']],
      body: rows.map(computador => [
        computador.fecha,
        computador.sede,
        computador.ubicacion,
        computador.area,
        computador.marca,
        computador.nombre_equipo,
        computador.sistema_operativo,
        computador.placa,
        computador.disco_duro,
        computador.memoria_ram,
        computador.ip,
        computador.serial,
        computador.mac,
        computador.usuario,
        computador.clave,
        computador.nombre_asignado,
        computador.cedula,
        computador.dominio,
        computador.fecha_mantenimiento,
        computador.tecnico,
        computador.observaciones,
        computador.img
      ]),
      styles: {
        tableWidth: 'wrap',
        tableHeight: 'auto',
        fontSize: 5, // Tamaño de fuente
        cellPadding: 2, // Espaciado interno de las celdas
        cellWidth: 9, // Ajuste automático del ancho de la celda
        valign: 'middle', // Alineación vertical del texto
        halign: 'center', // Alineación horizontal del texto
        overflow: 'linebreak', // Manejo de saltos de línea
        lineWidth: 0.1, // Ancho del borde de la tabla
        lineColor: [0, 0, 0], // Color del borde de la tabla
        fontStyle: 'normal', // Estilo de fuente
        textColor: [0, 0, 0], // Color del texto
        fillColor: [255, 255, 255], // Color de fondo de la celda
        rowPageBreak: 'auto', // Control de salto de página por fila
        columnWidth: 'auto' // Ancho automático de columna
      }
    });
    //guardar el pdf un nombre especifico 
    doc.save(`Tabla de computador.pdf`)

  }

  return (
    <>

      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Computadores</title>
        </head>
        <body style={{backgroundImage:`url(${imgs})`, backgroundSize:'cover', margin:'0', padding:'0' }}>
          <Narvbar />
          <Button style={{ marginTop:'10px', marginRight: '20px' }} variant="dark" onClick={enviarMenu}>Menu principal</Button>
          <Button variant="success"  style={{ marginTop:'10px', marginRight: '20px' }} onClick={generatePDF}>Generar PDF </Button>
          <Button style={{ marginTop:'10px', marginRight: '20px' }} variant="primary" onClick={handleShow}>
            Aqui agregas el computador
          </Button>
          <Button style={{marginTop:'10px',}} variant="success" onClick={handleShowID}>
            Listar por SERIAL
          </Button>

          <Modal show={showID} onHide={handleCloseID}>
            <Modal.Header closeButton>
              <Modal.Title >Buscar por SERIAL</Modal.Title>
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
                  <Button variant="success" ref={inputRefSerial} onKeyDown={handleKeyPressSerial} onClick={() => obtenerComputadores('serial', serial)}>Buscar</Button>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
          <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
              <Modal.Title>Quieres ingresar un computador?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form >
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
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Subir archivo</Form.Label>
                  <Form.Control type="file"  onChange={handleFileChange} />
                </Form.Group>
              </Form>
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

            <Modal show={showEliminar} onHide={handleCloseEli}>
              <Modal.Header closeButton>
                <Modal.Title>¿Quieres Eliminar computador?</Modal.Title>
              </Modal.Header>
              <Modal.Body>¿Estas seguro de eliminar?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEli}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => {
                  handleEliminarClick(idEliminar)
                }}>
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
          </Table>
          <div style={{ height: 900, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
      
            />
          </div>
          <Modal show={showModi} onHide={handleCloseModi}>
            <Modal.Header closeButton>
              <Modal.Title>Quieres modificar?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <br />
              <th>Fecha</th>
              <Form.Control type="text" placeholder="FECHA"
                id="fecha"
                name="fecha"
                autoComplete="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                required />
              <br />
              <th>Sedes</th>
              <Form.Control type="text" placeholder="SEDES"
                id="sede"
                name="sede"
                autoComplete="sede"
                value={formData.sede}
                onChange={handleInputChange}
                required />
              <br />
              <th>Ubicacion</th>
              <Form.Control type="text" placeholder="UBICACION"
                id="ubicacion"
                name="ubicacion"
                autoComplete="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                required />
              <br />
              <th>Marca</th>
              <Form.Control type="text" placeholder="MARCA"
                id="marca"
                name="marca"
                autoComplete="marca"
                value={formData.marca}
                onChange={handleInputChange}
                required />
              <br />
              <th>Nombre equipo</th>
              <Form.Control type="text" placeholder="NOMBRE EQUIPO"
                id="nombre_equipo"
                name="nombre_equipo"
                autoComplete="nombre_equipo"
                value={formData.nombre_equipo}
                onChange={handleInputChange}
                required />
              <br />
              <th>Sistema operativo</th>
              <Form.Control type="text" placeholder="SISTEMA OPERATIVO"
                id="sistema_operativo"
                name="sistema_operativo"
                autoComplete="sistema_operativo"
                value={formData.sistema_operativo}
                onChange={handleInputChange}
                required />
              <br />
              <th>Placa</th>
              <Form.Control type="text" placeholder="PLACA"
                id="placa"
                name="placa"
                autoComplete="placa"
                value={formData.placa}
                onChange={handleInputChange}
                required />
              <br />
              <th>Disco duro</th>
              <Form.Control type="text" placeholder="DISCO DURO"
                id="duro"
                name="duro"
                autoComplete="duro"
                value={formData.duro}
                onChange={handleInputChange}
                required />
              <br />
              <th>Serial</th>
              <Form.Control type="text" placeholder="SERIAL"
                id="serial"
                name="serial"
                autoComplete="serial"
                value={formData.serial}
                onChange={handleInputChange}
                required />
              <br />
              <th>Mac</th>
              <Form.Control type="text" placeholder="Mac"
                id="mac"
                name="mac"
                autoComplete="mac"
                value={formData.mac}
                onChange={handleInputChange}
                required />
              <br />
              <th>Ip</th>
              <Form.Control type="text" placeholder="IP"
                id="ip"
                name="ip"
                autoComplete="ip"
                value={formData.ip}
                onChange={handleInputChange}
                required />
              <br />
              <th>Usuario</th>
              <Form.Control type="text" placeholder="USUARIO"
                id="usuario"
                name="usuario"
                autoComplete="usuario"
                value={formData.usuario}
                onChange={handleInputChange}
                required />
              <br />
              <th>Clave</th>
              <Form.Control type="text" placeholder="CLAVE"
                id="clave"
                name="clave"
                autoComplete="clave"
                value={formData.clave}
                onChange={handleInputChange}
                required />
              <br />
              <th>Nombre asignado</th>
              <Form.Control type="text" placeholder="NOMBRE ASIGNADO"
                id="nombre_asignado"
                name="nombre_asignado"
                autoComplete="nombre_asignado"
                value={formData.nombre_asignado}
                onChange={handleInputChange}
                required />
              <br />
              <th>Cedula</th>
              <Form.Control type="text" placeholder="CEDULA"
                id="cedula"
                name="cedula"
                autoComplete="cedula"
                value={formData.cedula}
                onChange={handleInputChange}
                required />
              <br />
              <th>Fecha mantenimiento</th>
              <Form.Control type="text" placeholder="FECHA MANTENIMIENTO"
                id="fecha_mantenimiento"
                name="fecha_mantenimiento"
                autoComplete="fecha_mantenimiento"
                value={formData.fecha_mantenimiento}
                onChange={handleInputChange}
                required />
              <br />
              <th>Fecha mantenimiento</th>
              <Form.Control type="text" placeholder="TECNICO"
                id="tecnico"
                name="tecnico"
                autoComplete="tecnico"
                value={formData.tecnico}
                onChange={handleInputChange}
                required />
              <br />
              <Form.Group className="mb-3">
                <th>Dominio</th>
                <Form.Select aria-label="Dominio" name="dominio" value={formData.dominio} onChange={handleInputChange}>
                  <option value="">Seleccione el dominio</option>
                  <option value="SI">Si</option>
                  <option value="NO">No</option>
                </Form.Select>
              </Form.Group>
              <Form.Control type="text" placeholder="OBSERVACIONES"
                id="observaciones"
                name="observaciones"
                autoComplete="observaciones"
                value={formData.observaciones}
                onChange={handleInputChange}
                required />
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModi}>
                Cerrar
              </Button>
              <Button variant="success" onClick={(e) => handleSubmitModificar(e, idModi)}>
                Modificado
              </Button>
            </Modal.Footer>
          </Modal>
        </body>
      </html>
    </>
  )
}
