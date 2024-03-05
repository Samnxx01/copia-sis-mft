import React from 'react'

export const HelperRoutes = ({component, ...options}) => {
    const isAuth = false;
    if (!isAuth) return <Route {...options} component={component} />
    return <Redirect to="/" />
}