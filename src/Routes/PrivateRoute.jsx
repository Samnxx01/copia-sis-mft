import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Impresoras from '../componentes/Impresoras/Impresoras'
import Computadores from '../componentes/Computadores/Computadores'
import Reportes from '../componentes/Reportestecnicos/Reportescompu'
import Home from '../componentes/Home/Home'
import Table from '../componentes/datatable/datable'

export default function PrivateRoute() {
  return (
    <Routes>
      {/* Use individual Route components */}
      <Route path='/Home' element={<Home />}></Route>
      <Route path="/impresoras" element={<Impresoras />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path="/computadores" element={<Computadores />} />
      <Route path="/prueba" element={<Table />} />
    </Routes>
  );
}

//ya me dejo de trolear , que seguimos