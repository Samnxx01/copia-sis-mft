import React, { useEffect, useState } from 'react'
import Narvbar from '../Narvbar/Narvbar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';



export default function Reportescompu() {

  const [formData, setFormData] = useState({
    fecha: '',
    numero_caso: '',
    computadores: '',
    impresoras: '',
    registUros: '',
    marca: '',
    modelo: '',
    area: '',
    serial_parte: '',
    fecha_instalacion: '',
    extension: '',
    estado: '',
    equipo_garantia: '',
    correo_electronico: '',
    bajas: '',
  });

  const [usuarios, setUsuarios] = useState([]);

  const [computadoress, setComputadoresss] = useState([]);

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

      const response = await fetch('http://localhost:8000/api/inventario/guardarReportes', {
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
          setComputadoresss(data.listarCompu);
        } else {
          console.error('la api no responde.');
          // Handle the case where the API data is missing or has an unexpected structure
        }
      } catch (error) {
        console.error('Error fetching impresoras:', error);
      }
    };

    fetchComputadores();
  }, [])

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

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(' http://localhost:8000/api/inventario/listarUsuario', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        // Ensure data has the expected structure and property
        if (data && data.registros) {
          setUsuarios(data.registros);
        } else {
          console.error('la api no responde.');
          // Handle the case where the API data is missing or has an unexpected structure
        }
      } catch (error) {
        console.error('Error fetching impresoras:', error);
      }
    };

    fetchUsuarios();
  }, []);


  /*useEffect(() => {
    const fetchAmbas = async () => {
      try {
        // Realizar las dos llamadas API de manera simultánea
        const [impresorasResponse, computadoresResponse] = await Promise.all([
          fetch('http://localhost:8000/api/inventario/listarimpresoras'),
          fetch('http://localhost:8000/api/inventario/listarcompu')
        ]);

        // Convertir las respuestas a JSON
        const [impresorasData, computadoresData] = await Promise.all([
          impresorasResponse.json(),
          computadoresResponse.json()
        ]);

        // Combinar los resultados de ambas llamadas API en una sola lista
        const combinedOptions = [
          ...impresorasData.registrosImpreso.map(impresora => ({
            value: impresora._id,
            label: impresora.marca,
            type: 'Impresora'
          })),
          ...computadoresData.listarCompu.map(computador => ({
            value: computador._id,
            label: computador.nombre_asignado,
            type: 'Computador'
          }))
        ];

        // Establecer las opciones combinadas en el estado
        setOptions(combinedOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAmbas();
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
              <Form.Group as={Col} >
                <Form.Label><th>Fecha</th></Form.Label>
                <Form.Control type="text" placeholder="Fecha"
                  id="fecha"
                  name="fecha"
                  autoComplete="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Numero caso</th></Form.Label>
                <Form.Control type="text" placeholder="Fecha"
                  id="numero_caso"
                  name="numero_caso"
                  autoComplete="numero_caso"
                  value={formData.numero_caso}
                  onChange={handleInputChange}
                  required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <th className="mb-3">Datos del usuario</th>
              <Form.Group className="mb-3" as={Col}>
                <Form.Label><th>Nombre Completo</th></Form.Label>
                <Form.Select aria-label="Nombre Completo">
                  <option>Selecciona un usuario</option>
                  {computadoress.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.nombre_asignado}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label><th>Cedula</th></Form.Label>
                <Form.Select aria-label="Cedula">
                  <option>Selecciona un usuario</option>
                  {computadoress.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.cedula}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} >
                <Form.Label><th>Correo electronico</th></Form.Label>
                <Form.Control type="text" placeholder="Correo electronico" />
              </Form.Group>
              <Form.Group className="mb-3" as={Col}>
                <Form.Label><th>Area</th></Form.Label>
                <Form.Select aria-label="Area" name="area" value={formData.area} onChange={handleInputChange}>
                  <option>Seleccione el area</option>
                  <option value="CAJA-CLINICA">Caja clinica</option>
                  <option value="FARMACIA">Farmacia</option>
                  <option value="IMANGENOLOGIA">Imagenologia</option>
                  <option value="FACTURACION">Urgencias Facturacion</option>
                  <option value="ECOGRAFIA">Ecografia 2</option>
                  <option value="OBSERVACION">Observacion</option>
                  <option value="CONSULTORIO 1">Consultorio 1</option>
                  <option value="CONSULTORIO 2">Consultorio 2</option>
                  <option value="CONSULTORIO 3">Consultorio 3</option>
                  <option value="TRIAGE">Triage</option>
                  <option value="UCI PEDIATRICA">Uci pediatrica</option>
                  <option value="INTENSIVO INTERMEDIA">Intensivo Intermedia</option>
                  <option value="UCI EXPANSIVA">Uci Expansiva</option>
                  <option value="UCI QUIRUGICA">Uci Quirugica</option>
                  <option value="UCI CORHOTIZAN">Uci Corhotizan</option>
                  <option value="UCI NEONATAL">Uci Neonatal</option>
                  <option value="FACTURACION 3 PISO">Facturacion 3 piso</option>
                  <option value="UCI ADULTOS">Uci adultos</option>
                  <option value="REFRENCIA 4 PISO">Refrencia 4 Piso</option>
                  <option value="CIRUGIA">Cirugia</option>
                  <option value="GINECOLOGIA">Ginecologia</option>
                  <option value="ECOGRAFIA 5 PISO">Ecografia 5 Piso</option>
                  <option value="CARDIOVASCULAR">Cardiovascular 6 Piso</option>
                  <option value="TORRE B">Torre B</option>
                  <option value="TORRE C">Torre C</option>
                  <option value="TORRE D">Torre D</option>
                  <option value="RESONANCIA">Resonancia</option>
                  <option value="ELECTRODIAGNOSTICO">Electrodiagnostico</option>
                  <option value="PROCEDIMIENTOS">Procedimientos</option>
                  <option value="CONSULTORIO 101">Consultorio 101</option>
                  <option value="HISTORIA">Historia</option>
                  <option value="COORDINACION">Coordinacion</option>
                  <option value="SIAU">Siau</option>
                  <option value="ADMISIONES-OPICOPIAS">Admisiones(Opicopias)</option>
                  <option value="ADMISIONES-DEPORT">Admisiones(Deport)</option>
                  <option value="CONSULTORIO 201">Consultorio 201(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 202">Consultorio 202(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 203">Consultorio 203(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 204">Consultorio 204(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 205">Consultorio 205(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 206">Consultorio 206(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 207">Consultorio 207(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 208">Consultorio 208(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 209">Consultorio 209(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 210">Consultorio 210(Ambulatorios 1)</option>
                  <option value="FACTURACION 2">Facturacion 2(Ambulatorios 1)</option>
                  <option value="MEDICO-LABORAL">Medica Laboral(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 301">Consultorio 301(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 302">Consultorio 302(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 303">Consultorio 303(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 304">Consultorio 304(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 305">Consultorio 305(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 306">Consultorio 306(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 307">Consultorio 307(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 308">Consultorio 308(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 309">Consultorio 309(Ambulatorios 1)</option>
                  <option value="CONSULTORIO 310">Consultorio 310(Ambulatorios 1)</option>
                  <option value="FACTURACION-3-AMBULATORIOS-1 ">Facturacion 3(Ambulatorios 1)</option>
                  <option value="COORDINACION-ENFERMERIA">Coordinacion de Enfermeria</option>
                  <option value="PROGRAMACION-CIRUGIA">Programacion de Cirugia</option>
                  <option value="CONSULTA-EXTERNA">Consulta Externa Vieja(Ambulatorios 2)</option>
                  <option value="ECOGRAGIA-AMBULATORIO-2">Ecografia(Ambulatorios 2)</option>
                  <option value="GERENCIA">Gerencia(Casa 1)</option>
                  <option value="NOMINA-1">Nomina 1(Casa 1)</option>
                  <option value="NOMINA-2">Nomina 2(Casa 1)</option>
                  <option value="TESORERIA">Tesoreria(Casa 1)</option>
                  <option value="RECEPCION-CASA-1">Recepcion(Casa 1)</option>
                  <option value="CASA-2-OPICOPIAS">Casa 2 (opicopias)</option>
                  <option value="CUENTAS-MEDICAS">Cuentas Medicas(Deport)(Casa 2)</option>
                  <option value="RADICACION">Radicacion(Casa 2)</option>
                  <option value="CALIDAD">Calidad (Casa 2)</option>
                  <option value="CONTABILIDAD">Contabilidad(Casa 2)</option>
                  <option value="DEPORT-CASA-3">(Deport)(Casa 3)</option>
                  <option value="RECEPCION-CASA-3">Recepcion(Casa 3)</option>
                  <option value="BODEGA-FARMACIA">Bodega Farmacia(Casa 4)</option>
                  <option value="GLOSAS-CASA-4">Glosas(Casa 4)</option>
                  <option value="REHABILITACION">Rehabilitacion Cardiaca</option>
                  <option value="ARCHIVO">Archivos</option>
                  <option value="CONSULTORIO-2-URGENCIAS-2">Consultorio 2(Urgencias 2)</option>
                  <option value="RECEPCION-URGENCIAS-2">Recepcion(Urgencias 2)</option>
                  <option value="OBSERVACION-URGENCIAS-2">Observacion(Urgencias 2)</option>
                  <option value="TOMA DE MUESTRAS">Toma de muestras</option>

                </Form.Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label><th>Extension</th></Form.Label>
                <Form.Control type="text" placeholder="Extension"
                  id="extension"
                  name="extension"
                  autoComplete="extension"
                  value={formData.extension}
                  onChange={handleInputChange}
                  required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <th className="mb-3">Datos del equipo</th>
              <Form.Group as={Col} >
                <Form.Label><th>Tipo de equipo</th></Form.Label>
                <Form.Control type="text" placeholder="Tipo de equipo" />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Marca equipo</th></Form.Label>
                <Form.Control type="text" placeholder="Marca equipo" />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Serial</th></Form.Label>
                <Form.Control type="text" placeholder="Serial" />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label><th>Mac</th></Form.Label>
                <Form.Control type="text" placeholder="Mac" />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Equipo de garantia</th></Form.Label>
                <Form.Control type="text" placeholder="Equipo de garantia" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <th className="mb-3" >Datos del ingeniero</th>
              <Form.Group className="mb-3" as={Col}>
                <Form.Label><th>Nombre Completo</th></Form.Label>
                <Form.Select aria-label="Nombre Completo">
                  <option>Selecciona un usuario</option>
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.nickname}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} >
                <Form.Label><th>Correo Electronico</th></Form.Label>
                <Form.Control type="text" placeholder="Correo Electronico" />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Telefono/extension</th></Form.Label>
                <Form.Control type="text" placeholder="Telefono/extension" />
              </Form.Group>
              <Form.Group className="mb-3" as={Col}>
                <Form.Label><th>Celular</th></Form.Label>
                <Form.Select aria-label="Nombre Completo">
                  <option>Seleccione telefono</option>
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.telefono}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <th className="mb-3">Datos de la partes instaladas</th>
              <Form.Group as={Col} >
                <Form.Label><th>Marca</th></Form.Label>
                <Form.Control type="text" placeholder="Marca" />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label><th>Modelo</th></Form.Label>
                <Form.Control type="text" placeholder="Modelo" />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Serial de la parte</th></Form.Label>
                <Form.Control type="text" placeholder="Serial de la parte" />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Fecha de instalacion</th></Form.Label>
                <Form.Control type="text" placeholder="Fecha de instalacion" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <th className="mb-3">Datos de la parte defectuosa</th>
              <Form.Group as={Col} >
                <Form.Label><th>Tipo de parte</th></Form.Label>
                <Form.Control type="text" placeholder="Tipo de parte" />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Serial de parte</th></Form.Label>
                <Form.Control type="text" placeholder="Serial de parte" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <th className="mb-3">Se seguiere dar baja</th>

              <Form.Group as={Col} >
                <Form.Label><th>Tipo de parte</th></Form.Label>
                <Form.Control type="text" placeholder="Tipo de parte" />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Serial de parte</th></Form.Label>
                <Form.Control type="text" placeholder="Serial de parte" />
              </Form.Group>

            </Row>
            <Row className="mb-3">
              <Form.Group className="mb-3" >
                <Form.Label><th>Diagnostico de elemento</th></Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Row>

            <Row className="mb-3">

              <Form.Group as={Col} >
                <Form.Label><th></th></Form.Label>
                <Form.Control type="text" placeholder="Activos Fijos" />
                <th>Activos Fijos</th>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label></Form.Label>
                <Form.Control type="text" placeholder="Coordinador de soporte" />
                <th>Coordinador de soporte</th>
              </Form.Group>
            </Row>

            <Button  variant="primary" onClick={handleSubmit} type="submit">
              Enviar
            </Button>
          </Form>
        </body>
      </html>

    </>

  )
}
