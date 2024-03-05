import React, { createContext, useState } from 'react';

// Creamos el contexto de usuario
const userContext = createContext();

// Creamos un provider para el contexto de usuario
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  console.log(user);
  const addUser = (data) => {
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    console.log(user)
  }
  const cerrarSesion = () => {
    setUser(null);
    localStorage.setItem('user', JSON.stringify(null));
  }

  return (
    <userContext.Provider value={{ user, setUser, addUser, cerrarSesion }}>
      {children}
    </userContext.Provider>
  );
};

export default userContext;


//me salio 500 el error por importacion , le cambio el nonmbre?