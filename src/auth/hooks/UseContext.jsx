import React, { createContext, useState } from 'react';

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const addUser = (datos) => {
    setUser(datos);
    localStorage.setItem('user', JSON.stringify(datos));
  };

  const cerrarSesion = () => {
    setUser(null);
    localStorage.setItem('user', JSON.stringify(null));
  };

  const isCoordinator = () => {
    return user && user.role === 'coordinador';
  };

  const isTechnician = () => {
    return user && user.role === 'tecnico';
  };

  console.log(user);
  
  const value = {
    user,
    setUser,
    addUser,
    cerrarSesion,
    isCoordinator,
    isTechnician
  };

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
};

export default userContext;
