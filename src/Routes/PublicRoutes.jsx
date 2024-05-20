import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from '../auth/Login/Login'

import Registro from '../auth/registros/Registros'


export default function PublicRoutes() {
    return (
        <Routes>
            <Route path='/Registro' element={<Registro />}></Route>
            <Route path='/' element={<Login />}></Route>
        </Routes>
    )
}
