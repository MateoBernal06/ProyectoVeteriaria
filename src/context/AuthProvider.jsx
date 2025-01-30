import axios from 'axios'
import { createContext, useEffect, useState, useContext } from 'react'

const AuthContext = createContext() //Grupo de whatsapp

const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth debe estar dentro del proveedor AuthProvider')
    }
    return context
}
//mensaje a enviar
//children = miembros del grupo
const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const Perfil = async (token, rol) => {
        let url
        try {
            if(rol === 'veterinario'){
                url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            }else if(rol ==='paciente'){
                url = `${import.meta.env.VITE_BACKEND_URL}/paciente/perfil`
            } 
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setAuth(respuesta.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')
        if (token && rol) {
            Perfil(token, rol)
        }
    }, [])

    const actualizarPerfil = async (datos) => {
    
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/${datos.id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            setAuth(prevAuth => ({
                ...prevAuth,  
                msg: respuesta.data.msg
            }))
            return { respuesta: respuesta.data.msg, tipo: true }
        } catch (error) {
            return { respuesta: error.response.data.msg, tipo: false }
        }
    }


    const actualizarPassword  = async (datos) => {
        const token = localStorage.getItem('token')
        try{
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/actualizarpassword`
            const options ={
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            setAuth(prevAuth => ({
                ...prevAuth,  
                msg: respuesta.data.msg
            }))
            console.log(auth)
            return { respuesta: respuesta.data.msg, tipo: true }
        
        }catch(error){
            return { respuesta: error.response.data.msg, tipo: false }
            
        }
        
    }

    return (
        <AuthContext.Provider value={
            { //contenido del mensaje
                auth,
                setAuth,
                actualizarPerfil,
                actualizarPassword
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }
export default AuthContext