import React from 'react'
import Impresorass from '../Impresoras/Impresoras'
import Login from '../../auth/Login/Login'
import Narvbar  from '../Narvbar/Narvbar'
import { io } from 'socket.io-client'
//import Reportes from'../Reportes-tecnicos/Reportes-compu'

export default function Home() {

  const socket = io('http://localhost:8000');


  socket.on('connect', () =>{
    console.log('conectado')

  })
  return (
    <Narvbar/>
  )
}
