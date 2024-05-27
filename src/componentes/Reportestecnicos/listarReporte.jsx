import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function listarReporte() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [numero, setNumero] = useState('');
    useEffect(() => {
        const fetchReportes = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/inventario/listar', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                // Ensure data has the expected structure and property
                if (data && data.mostrarReportes) {
                    setReportes(data.mostrarReportes);
                } else {
                    console.error('la api no responde.');
                    // Handle the case where the API data is missing or has an unexpected structure
                }
            } catch (error) {
                console.error('Error fetching impresoras:', error);
            }
        };

        fetchReportes();
    }, [])


    const obtenerReportePorId = async (tipoBusqueda, valorBusqueda) => {
        try {
            let url;
            if (tipoBusqueda === 'numero_caso') {
                url = `http://localhost:8000/api/inventario/listar/${valorBusqueda}`;
            } else if (tipoBusqueda === 'id') {
                url = `http://localhost:8000/api/inventario/listar/${valorBusqueda}`;
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

            if (datos && datos.mostrarReportes) {
                console.log('Reportes encontrados:', datos.mostrarReportes);
                // Aquí puedes manejar los reportes encontrados, por ejemplo, actualizando el estado del componente
            } else {
                console.error('API no responde o reportes no encontrados.');
                // Manejar la situación donde no se encuentran reportes
            }
        } catch (error) {
            console.error('Error al obtener reportes:', error);
        }
    };


    const [reportes, setReportes] = useState([]);
    return (
        <>
            
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Listar</title>
            </head>
            <body>
            <Button variant="primary" onClick={handleShow}>
                Ingrese a buscar reporte
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Buscar Reporte</Modal.Title>
                </Modal.Header>
                <Modal.Body>                 <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Ingrese el numero de caso</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="numero"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)} />
                        <Button variant="success" onClick={() => obtenerReportePorId('numero', numero)}>Buscar</Button>
                    </Form.Group>
                </Form></Modal.Body>
            </Modal>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell align="right">Número de Caso</TableCell>
                            <TableCell align="right">Nombre Usuario</TableCell>
                            <TableCell align="right">Cédula Usuario</TableCell>
                            <TableCell align="right">Correo Electrónico Usuario</TableCell>
                            <TableCell align="right">Área</TableCell>
                            <TableCell align="right">Nombre Ingeniero</TableCell>
                            <TableCell align="right">Correo Ingeniero</TableCell>
                            <TableCell align="right">Extensión Ingeniero</TableCell>
                            <TableCell align="right">Celular Ingeniero</TableCell>
                            <TableCell align="right">Marca Dispositivos</TableCell>
                            <TableCell align="right">Serial Dispositivo</TableCell>
                            <TableCell align="right">MAC Dispositivos</TableCell>
                            <TableCell align="right">Tipo Equipo</TableCell>
                            <TableCell align="right">Serial Equipo Baja</TableCell>
                            <TableCell align="right">Marca Instalado</TableCell>
                            <TableCell align="right">Modelo Instalación</TableCell>
                            <TableCell align="right">Serial Parte</TableCell>
                            <TableCell align="right">Fecha Instalación</TableCell>
                            <TableCell align="right">Equipo Garantía</TableCell>
                            <TableCell align="right">Reporte Garantía</TableCell>
                            <TableCell align="right">Serial Garantía</TableCell>
                            <TableCell align="right">Diagnóstico</TableCell>
                            <TableCell align="right">Activos Fijos</TableCell>
                            <TableCell align="right">Coordinador Área</TableCell>
                            <TableCell align="right">Imagen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportes.map((row) => (
                            <TableRow key={row.serial_dispositivo}>
                                <TableCell component="th" scope="row">{row.fecha}</TableCell>
                                <TableCell align="right">{row.numero_caso}</TableCell>
                                <TableCell align="right">{row.nombre_usuario}</TableCell>
                                <TableCell align="right">{row.cedula_usuario}</TableCell>
                                <TableCell align="right">{row.correo_electronico_usuario}</TableCell>
                                <TableCell align="right">{row.area}</TableCell>
                                <TableCell align="right">{row.nombre_ingeniero}</TableCell>
                                <TableCell align="right">{row.correo_ing}</TableCell>
                                <TableCell align="right">{row.extension_ing}</TableCell>
                                <TableCell align="right">{row.celular_ing}</TableCell>
                                <TableCell align="right">{row.marca_dispositivos}</TableCell>
                                <TableCell align="right">{row.serial_dispositivo}</TableCell>
                                <TableCell align="right">{row.mac_dispositivos}</TableCell>
                                <TableCell align="right">{row.tipo_equipo}</TableCell>
                                <TableCell align="right">{row.serial_equipo_baja}</TableCell>
                                <TableCell align="right">{row.marca_instalado}</TableCell>
                                <TableCell align="right">{row.modelo_instalacion}</TableCell>
                                <TableCell align="right">{row.serial_parte}</TableCell>
                                <TableCell align="right">{row.fecha_instalacion}</TableCell>
                                <TableCell align="right">{row.equipo_garantia}</TableCell>
                                <TableCell align="right">{row.reporte_garantia}</TableCell>
                                <TableCell align="right">{row.serial_garantia}</TableCell>
                                <TableCell align="right">{row.diagnostico}</TableCell>
                                <TableCell align="right">{row.activos_fijos}</TableCell>
                                <TableCell align="right">{row.coordinador_area}</TableCell>
                                <TableCell align="right">{row.img}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </body>
            </html>
        </>
    )
}
