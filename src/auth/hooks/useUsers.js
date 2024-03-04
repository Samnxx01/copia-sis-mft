import React from 'react'
import { useContext } from './useContext'

export default function useUsers() {
    
    const [formData, setFormData] = useState({
        correo: '',
        password: '',
        rol: 'TECNICO',
    });
    

    const [login, dispach] = useContext(useContext)

    const handleLogin = () =>{

    }

    return (
        <>
        
        
        </>

    )
}
