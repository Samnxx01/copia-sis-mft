
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useReactToPrint } from 'react-to-print'


export default function datable() {

  const componentPDF = useRef();
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,

      [name]: value,
    });
  };

  const handleCerrar = () => setEliminar(false);
  const [seleccionaModificacion, setSeleccionModificacion] = useState({})
  const [impresoras, setImpresoras] = useState([]);
  const [idEliminar, setIdEliminar] = useState('');
  const [idModi, setIdModi] = useState('');
  const [showEliminar, setEliminar] = useState(false);
  const [showModi, setModi] = useState(false);
  const handleCloseModi = () => setModi(false);



  const handleModificarImpresora = (id) => {
    const impresora = impresoras.find(impresora => impresora._id === id);
    setSeleccionModificacion(impresora);
    setFormData(impresora);
    setModi(true);
    setIdModi(id);
  };

  const handleDeleteImpresora = (id) => {
    setEliminar(true);
    setIdEliminar(id)
  }
  const [selectedRows, setSelectedRows] = useState([]);

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

  const handleEliminarClick = async (id) => {

    const impresora = impresoras.find(impresora => impresora._id === id);
    const numeroSerie = impresora && impresora.serial;

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
      const response = await fetch(`http://localhost:8000/api/inventario/modificarImpresoras/${id}`, {
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



  const columns = [

    { field: 'id', headerName: 'id', width: 130 },
    { field: 'sedes', headerName: 'Sedes', width: 130 },
    { field: 'pisos', headerName: 'Pisos', width: 130 },
    { field: 'ip', headerName: 'IP', width: 130 },
    { field: 'serial', headerName: 'Serial', width: 130 },
    { field: 'ubicacion', headerName: 'Ubicacion', width: 130 },
    { field: 'mac', headerName: 'MAC', width: 130 },
    { field: 'marca', headerName: 'Marca', width: 130 },
    { field: 'contador', headerName: 'Contador', width: 130 },
    { field: 'fecha', headerName: 'Fecha', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <>
          <Button variant="danger" onClick={() => { handleDeleteImpresora(params.row.id) }} >Eliminar</Button>
          <Button variant="info" onClick={() => handleModificarImpresora(params.row._id)}>Modificar</Button>
        </>
      ),
    },
  ];
  const rows = impresoras.map((impresora) => ({
    id: impresora._id,
    sedes: impresora.sedes,
    pisos: impresora.pisos,
    ip: impresora.ip,
    serial: impresora.serial,
    ubicacion: impresora.ubicacion,
    mac: impresora.mac,
    marca: impresora.marca,
    contador: impresora.contador,
    fecha: impresora.fecha,
  }));

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel);
  };

  const generarPDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Impresoras",
    onAfterPrint: () => alert("Guardado pdf")
  })
  const generarPDFSeleccionado = () => {
    if (selectedRows.length > 0) {
      // Filtramos las filas seleccionadas y las pasamos a la función de generación de PDF
      const selectedRowsData = rows.filter(row => selectedRows.includes(row.id));
      generarPDF(selectedRowsData);
    } else {
      alert('Por favor selecciona al menos una fila para generar el PDF.');
    }
  };
  return (

    <>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Prueba</title>
        </head>
        <body>

          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              ref={componentPDF}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
              checkboxSelection
              onSelectionModelChange={handleSelectionChange}
            />
          </div>
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
              <Button variant="success" onClick={(e) => handleSubmitModificar(e, idModi)}>
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
          <Button variant="success" style={{marginLeft:'4px'}} onClick={generarPDF}> PDF </Button>
          <Button variant="success"  onClick={generarPDFSeleccionado}>Generar PDF Seleccionado</Button>
        </body>
      </html>

    </>
  );
}