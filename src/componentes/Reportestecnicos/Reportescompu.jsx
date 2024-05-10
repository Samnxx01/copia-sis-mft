import React, { useEffect, useState } from 'react';
import Narvbar from '../Narvbar/Narvbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Reportescompu() {

  const [formData, setFormData] = useState({
    fecha: '',
    numero_caso: '',
    computadores:{
      id: '',
      serial:'',
      mac:'',
      nombre_asignado:'',
      cedula:'', 
      disco_duro:'',
      memoria_ram:''
    },
    impresoras:{
      id:'',
      serial:'',
      mac:''
    },
    registUros:{
      nickname:'',
      correo:'',
      telefono:'',
      extension:''
    },
    tipo_equipo: '',
    marca: '',
    modelo: '',
    serial_parte: '',
    fecha_instalacion: '',  
    extension: '',
    correo_electronico: '',
    area: '',
    bajas:{
      id:'',
      serial_parte:'',
      tipo_parte:''
    },
    equipo_garantia: '',
    activos_fijos: '',
    diagnostico: '',
  });

  const idCompu = formData.computadores.id
  const serialCom = formData.computadores.serial
  const macCompu = formData.computadores.mac
  const nombre_asigandoPc = formData.computadores.nombre_asignado
  const cedulaCompu = formData.computadores.cedula
  const discoCompu = formData.computadores.disco_duro
  const memoriaPc = formData.computadores.memoria_ram

  const [usuarios, setUsuarios] = useState([]);
  const [computadoress, setComputadoresss] = useState([]);
  const [bajas, setBajas] = useState([]);
  const [optionsMarca, setOptionsMarca] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionsMac, setOptionsMac] = useState([]);
  const [impresorass, setImpresorass] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/inventario/guardarReportes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'codificado': ''
        },
        body: JSON.stringify({
          ...formData,
        })
      });

      if (response.ok) {
        alert('¡Registro exitoso!');
        // Redirigir a la página de inicio de sesión
      } else {
        console.error('datos incorrectos');
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usuariosResponse, computadoresResponse, bajasResponse] = await Promise.all([
          fetch('http://localhost:8000/api/inventario/listarUsuario'),
          fetch('http://localhost:8000/api/inventario/listarcompu'),
          fetch('http://localhost:8000/api/inventario/listarBajas')
        ]);

        const [usuariosData, computadoresData, bajasData] = await Promise.all([
          usuariosResponse.json(),
          computadoresResponse.json(),
          bajasResponse.json()
        ]);

        setUsuarios(usuariosData.registros);
        setComputadoresss(computadoresData.listarCompu);
        setBajas(bajasData.listarBajass);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
          setImpresorass(data.registrosImpreso);
        } else {
          console.error('la api no responde.');
          // Handle the case where the API data is missing or has an unexpected structure
        }
      } catch (error) {
        console.error('Error fetching impresoras:', error);
      }
    };

    fetchImpresoras();
  }, [])

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [impresorasResponse, computadoresResponse] = await Promise.all([
          fetch('http://localhost:8000/api/inventario/listarimpresoras'),
          fetch('http://localhost:8000/api/inventario/listarcompu')
        ]);

        const [impresorasData, computadoresData] = await Promise.all([
          impresorasResponse.json(),
          computadoresResponse.json()
        ]);

        const combinedOptionsMarca = [
          ...impresorasData.registrosImpreso.map(impresora => ({
            value: impresora._id,
            label: impresora.marca,
            type: 'Impresora'
          })),
          ...computadoresData.listarCompu.map(computador => ({
            value: computador._id,
            label: computador.marca,
            type: 'Computador'
          }))
        ];

        const combinedOptionsSerial = [
          ...impresorasData.registrosImpreso.map(impresora => ({
            value: impresora._id,
            label: impresora.serial,
            type: 'Impresora'
          })),
          ...computadoresData.listarCompu.map(computador => ({
            value: computador._id,
            label: computador.serial,
            type: 'Computador'
          }))
        ];

        const combinedOptionsMac = [
          ...impresorasData.registrosImpreso.map(impresora => ({
            value: impresora._id,
            label: impresora.mac,
            type: 'Impresora'
          })),
          ...computadoresData.listarCompu.map(computador => ({
            value: computador._id,
            label: computador.mac,
            type: 'Computador'
          }))
        ];

        setOptionsMarca(combinedOptionsMarca);
        setOptions(combinedOptionsSerial);
        setOptionsMac(combinedOptionsMac);
      } catch (error) {
        console.error('Error al cargar la informacion:', error);
      }
    };

    fetchOptions();
  }, []);


  return (
    <>
      <html lang="en">
        <head>
          <meta />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Reportes</title>
        </head>
        <body>
          <Narvbar />
          <Form >
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
                <Form.Select aria-label="computadores" name="computadores" value={data.nombre_asignado} onChange={handleInputChange}>
                  <option>Seleccione usuario</option>
                  {computadoress.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.nombre_asignado}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label><th>Cedula</th></Form.Label>
                <Form.Select aria-label="computadores" name="computadores" value={data.cedula} onChange={handleInputChange}>
                  <option>Seleccione cedula</option>
                  {computadoress.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.cedula}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} >
                <Form.Label><th>Correo electronico</th></Form.Label>
                <Form.Control type="email" placeholder="Correo electronico"
                  id="correo_electronico"
                  name="correo_electronico"
                  autoComplete="correo_electronico"
                  value={formData.correo_electronico}
                  onChange={handleInputChange}
                  required />
              </Form.Group>
              <Form.Group className="mb-3" as={Col}>
                <Form.Label><th>Area</th></Form.Label>
                <Form.Select aria-label="area" name="area" value={formData.area} onChange={handleInputChange}>
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

              <Form.Group className="mb-3" as={Col}>
                <Form.Label><th>Tipo de equipo</th></Form.Label>
                <Form.Select aria-label="tipo_equipo" name="tipo_equipo" value={formData.tipo_equipo} onChange={handleInputChange}>
                  <option>Seleccione el equipo</option>
                  <option value="TODO-EN-UNO">COMPUTADOR</option>
                  <option value="TORRE-PC">TORRE+MONITOR</option>
                  <option value="PORTATIL">PORTATIL</option>
                  <option value="TABLET">TABLET</option>
                  <option value="IMPRESORA">IMPRESORA</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" as={Col}>
                <Form.Label><th>Marca</th></Form.Label>
                <Form.Select aria-label="marca" name="marca" onChange={handleInputChange}>
                  <option value="">Seleccione una marca</option>
                  {optionsMarca.map(option => (
                    <option key={option.value} value={option.value}>{`${option.label} (${option.type})`}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" as={Col}>
                <Form.Label><th>Serial</th></Form.Label>
                <Form.Select aria-label="computadores" name="computadores" value={formData.computadores} onChange={handleInputChange}>
                  <option value="">Seleccione un serial</option>
                  {options.map(option => (
                    <option key={option.value} value={option.value}>{`${option.label} (${option.type})`}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label><th>Mac</th></Form.Label>
                <Form.Select aria-label="Nombre Completo" onChange={handleInputChange}>
                  <option value="">Seleccione una mac</option>
                  {optionsMac.map(option => (
                    <option key={option.value} value={option.value}>{`${option.label} (${option.type})`}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Equipo de garantia</th></Form.Label>
                <Form.Select aria-label="equipo_garantia" name="equipo_garantia" value={formData.equipo_garantia}
                 onChange={handleInputChange}>
                  <option>Seleccione el area</option>
                  <option value="SI">SI</option>
                  <option value="NO">N/A</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <th className="mb-3" >Datos del ingeniero</th>
              <Form.Group className="mb-3" as={Col}>
                <Form.Label><th>Nombre Completo</th></Form.Label>
                <Form.Select aria-label="Nombre Completo">
                  <option >Selecciona un usuario</option>
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.nickname}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} >
                <Form.Label><th>Correo Electronico</th></Form.Label>
                <Form.Select aria-label="Cedula">
                  <option value="">Seleccione correo</option>
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.correo}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Telefono/extension</th></Form.Label>
                <Form.Control type="text" placeholder="Telefono/extension" />
              </Form.Group>
              <Form.Group className="mb-3" as={Col}>

                <Form.Label><th>Celular</th></Form.Label>
                <Form.Select aria-label="Nombre Completo">
                  <option value="" >Seleccione telefono</option>
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
                <Form.Control type="text" placeholder="Marca" id="marca"
                  name="marca"
                  autoComplete="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  required />
              </Form.Group>


              <Form.Group as={Col} >
                <Form.Label><th>Modelo</th></Form.Label>
                <Form.Control type="text" placeholder="Marca" id="modelo"
                  name="modelo"
                  autoComplete="modelo"
                  value={formData.modelo}
                  onChange={handleInputChange}
                  required />
              </Form.Group>



              <Form.Group as={Col} >
                <Form.Label><th>Serial de la parte</th></Form.Label>
                <Form.Control type="text" placeholder="Serial de la parte"
                  id="serial_parte"
                  name="serial_parte"
                  autoComplete="serial_parte"
                  value={formData.serial_parte}
                  onChange={handleInputChange}
                  required />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Fecha de instalacion</th></Form.Label>
                <Form.Control type="text" placeholder="Fecha de instalacion"
                  id="fecha_instalacion"
                  name="fecha_instalacion"
                  autoComplete="fecha_instalacion"
                  value={formData.fecha_instalacion}
                  onChange={handleInputChange}
                  required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <th className="mb-3">Datos de la parte defectuosa</th>
              <Form.Group as={Col} >
                <Form.Label><th>Tipo de parte</th></Form.Label>
                <Form.Select aria-label="tipo_parte">
                  <option value="" >Seleccione memoria ram</option>
                  {computadoress.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.memoria_ram}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Tipo de parte</th></Form.Label>
                <Form.Select aria-label="tipo_parte">
                  <option value="" >Seleccione disco duro</option>
                  {computadoress.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.disco_duro}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <th className="mb-3">Se seguiere dar baja</th>

              <Form.Group as={Col} >
                <Form.Label><th>Tipo de parte</th></Form.Label>
                <Form.Select aria-label="tipo_parte">
                  <option value="" >Seleccione disco duro</option>
                  {bajas.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.tipo_parte}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label><th>Serial de parte</th></Form.Label>
                <Form.Select aria-label="tipo_parte">
                  <option value="" >Seleccione serial</option>
                  {bajas.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.serial_parte}</option>
                  ))}
                </Form.Select>
              </Form.Group>

            </Row>
            <Row className="mb-3">
              <Form.Group className="mb-3" >
                <Form.Label><th>Diagnostico de elemento</th></Form.Label>
                <Form.Control type="text" placeholder="Escriba su diagnostico"
                  id="diagnostico"
                  name="diagnostico"
                  autoComplete="diagnostico"
                  value={formData.diagnostico}
                  onChange={handleInputChange}
                  required />
              </Form.Group>
            </Row>

            <Row className="mb-3">

              <Form.Group as={Col} >
                <Form.Label><th></th></Form.Label>
                <Form.Control type="text" placeholder="Activos fijos"
                  id="activos_fijos"
                  name="activos_fijos"
                  autoComplete="activos_fijos"
                  value={formData.activos_fijos}
                  onChange={handleInputChange}
                  required />
                <th>Activos Fijos</th>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label></Form.Label>
                <Form.Select aria-label="coordinador">
                  <option value="">Selecciona un usuario</option>
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.nickname}</option>
                  ))}
                </Form.Select>
                <th>Coordinador de soporte</th>
              </Form.Group>
            </Row>

            <Button variant="primary" onClick={handleSubmit} type="submit">
              Enviar
            </Button>
          </Form>
        </body>
      </html>

    </>

  )
}
