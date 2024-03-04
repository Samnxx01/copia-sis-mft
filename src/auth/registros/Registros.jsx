import React, { useState } from 'react'
//import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

export default function Registros() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nickname: '',
    apellido: '',
    correo: '',
    password: '',
    telefono: '',
    rol: 'TECNICO',
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

    try {
    
        const response = await fetch('http://localhost:8000/api/inventario/registro/tecnico', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('¡Registro exitoso!');
            navigate('/'); // Redirigir a la página de inicio de sesión
        } else {
            console.error('datos incorrectos');
            alert('Error en el registro');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};

  return (
    <>
    <Container className="d-flex justify-content-center align-items-center h-100"> {/* Utiliza clases de Bootstrap para centrar vertical y horizontalmente */}
      <Row>
        <Col>
          <Form className="login-form"> {/* Agrega una clase para aplicar estilos personalizados */}
          <Form.Text className="text">Registrarse</Form.Text>
          <Form.Group className="mb-3" >

              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                required
                placeholder="Nombre del tecnico"
              />
            </Form.Group>

          <Form.Group className="mb-3" >

            <Form.Label>apellido</Form.Label>
            <Form.Control
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              required
              placeholder="Nombre del tecnico"
            />
            </Form.Group>

            
          <Form.Group className="mb-3">
              <Form.Label>correo</Form.Label>
              <Form.Control
                type="email"
                id="correo"
                name="correo"
                autoComplete="email"
                value={formData.correo}
                onChange={handleInputChange}
                required
                placeholder="Correo electronico"
              />
              
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Contraseña"
              />
              
              <Form.Group className="mb-3">
              <Form.Label>telefono</Form.Label>
              <Form.Control
                type="text"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
                placeholder="telefono"
              />
              
            </Form.Group>
              
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit} >
              Ingresar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  )
}

