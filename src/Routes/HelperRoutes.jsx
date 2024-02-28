import React from 'react'
import { Route} from 'react-router-dom';




export default function HelperRoutes({component, ...options}) {
    const isAuth = false;
    if (!isAuth) return <Route {...options} component={component} />
    return <Redirect to="/" />
}
