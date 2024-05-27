import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Impresoras from '../componentes/Impresoras/Impresoras'
import Computadores from '../componentes/Computadores/Computadores'
import Reportes from '../componentes/Reportestecnicos/Reportescompu'
import Home from '../componentes/Home/Home'
import Table from '../componentes/datatable/datable'
import userContext from '../auth/hooks/UseContext'
import ListarReportes from '../componentes/Reportestecnicos/listarReporte'

export default function PrivateRoute() {

  const { user } = useContext(userContext);
    if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not logged in
  }

  return (
    <Routes>
      {/* Use individual Route components */}
      <Route path='/Home' element={<Home />}></Route>
      <Route path="/impresoras" element={<Impresoras />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path="/listarReportes" element={<ListarReportes />} />
      <Route path="/computadores" element={<Computadores />} />
      <Route path="/prueba" element={<Table />} />

      <Route path="*" element={<Navigate to="/Home" />} />
    </Routes>
  );
}

