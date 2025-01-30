import { toast, ToastContainer } from 'react-toastify'
import logoDog from '../assets/dog-hand.webp'
import {Link, useParams} from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

export const Confirmar = () => {

    //Paso 1

    const {token} = useParams()

    //Paso 2

    const VerifyToken = async () => {
        try{
            const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`
            const respuesta = await axios.get(url)
            toast.success(respuesta.data.msg)
        }catch(error){
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    useEffect(()=>{
        VerifyToken()
    },[])
    
    return (
        
        <div className="flex flex-col items-center justify-center">
            <ToastContainer />
            <img class="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={logoDog} alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Muchas Gracias</p>
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Ya puedes iniciar sesión</p>
                <Link to="/login" className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Login</Link>
            </div>

        </div>
    )
}
