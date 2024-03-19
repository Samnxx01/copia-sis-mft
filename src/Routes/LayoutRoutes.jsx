import React, { useContext } from 'react'
import userContext from '../auth/hooks/UseContext'
import PublicRoutes from './PublicRoutes'
import PrivateRoute from './PrivateRoute'

export default function LayoutRoutes() {


    const {user} = useContext(userContext)

  return (
    <React.Fragment>
    {user ? <PrivateRoute/> : <PublicRoutes />}
  </React.Fragment>
  )
}
//no me esta leyendo privateRoute