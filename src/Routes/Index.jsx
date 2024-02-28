import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../componentes/Home/Home'
import Impresoras from '../componentes/Impresoras/Impresoras'
import Login from '../auth/Login/Login'



function Index() {
  return (
    <Routes>

            <Route path='/Impresoras' element={<Impresoras/>}></Route> 
            <Route path='/'  element={<Login/>}></Route> 
            <Route path='/Home'  element={<Home/>}></Route> 


        <Route path='/' element={<Navigate to={'/'}/>}></Route>
  </Routes>

  )
}

export default Index
