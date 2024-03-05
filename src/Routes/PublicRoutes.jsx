import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from '../auth/Login/Login'
import Home from '../componentes/Home/Home'
import Registro from '../auth/registros/Registros'


export default function PublicRoutes() {
    return (
        <Routes>
            <Route path='/Registro' element={<Registro />}></Route>
            <Route path='/Login' element={<Login />}></Route>
            <Route path='/' element={<Home />}></Route>
        </Routes>
    )
}
//listo en la parte de impresoras yo envio el id iud asi tengo que enviarlo?