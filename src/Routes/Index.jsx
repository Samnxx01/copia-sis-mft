import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../componentes/Home/Home'
import Impresoras from '../componentes/Impresoras/Impresoras'
import Login from '../auth/Login/Login'
import Reportes from '../componentes/Reportestecnicos/Reportescompu'
import Registro from '../auth/registros/Registros'
import Computadores from '../componentes/Computadores/Computadores'
import Narvbar from '../componentes/Narvbar/Narvbar'

//se tiene que importar aqui cuando hago el hook de context?

function Index() {
  <Narvbar/>

//como hago para verificar que requieran el parametro?
  return (
    
    <Routes>
            <Route path='/Impresoras' element={<Impresoras/>}></Route> 
            <Route path='/Registro' element={<Registro/>}></Route> 
            <Route path='/Login'  element={<Login/>}></Route> 
            <Route path='/Home'  element={<Home/>}></Route> 
            <Route path='/Reportes'  element={<Reportes/>}></Route> 
            <Route path='/Computadores'  element={<Computadores/>}></Route> 
  </Routes>

  )
}

export default Index
