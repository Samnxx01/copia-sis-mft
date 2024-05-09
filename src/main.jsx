import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Index from './Routes/Index'
import UserProvider from './auth/hooks/UseContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider.Provider>
        <App />
      </UserProvider.Provider>
    </BrowserRouter>
  </React.StrictMode>
)
