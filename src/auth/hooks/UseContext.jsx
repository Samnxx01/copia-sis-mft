import React, { createContext, useState, useContext } from 'react';

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const validarRol = (rolRequerido) => {
    // Validación mejorada para mayor seguridad
    return user && user.rol === rolRequerido && user.isLoggedIn; // Comprueba rol y estado de inicio de sesión
  };

  const addUser = (datos) => {
    setUser(datos);
    localStorage.setItem('user', JSON.stringify(datos));
  };

  const cerrarSesion = () => {
    setUser(null);
    localStorage.setItem('user', JSON.stringify(null));
  };

  console.log(user)
  const value = {
    user,
    setUser,
    addUser,
    cerrarSesion,
    esCoordinador: () => validarRol('COORDINADOR'),
    esTecnico: () => validarRol('TECNICO'),
  };

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
};

export default userContext;

