import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
export const Formulario = () => {

    const navigate = useNavigate()

    //Paso 1
    const [form, setForm] = useState({
        nombre: "",
        propietario: "",
        email: "",
        celular: "",
        convencional: "",
        sintomas: ""
    })

    //Paso 2
    const HandleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //Paso 3

    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token= localStorage.getItem('token')
            console.log(token)
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, form, options)
            navigate('/dashboard/listar')
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    return (
        <div>
            <ToastContainer />
            <form onSubmit={HandleSubmit}>

                <div>
                    <label
                        htmlFor='nombre'
                        className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                    <input
                        id='nombre'
                        name='nombre'
                        onChange={HandleChange}
                        value={form.nombre || ""}
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='nombre'
                    />
                </div>
                <div>
                    <label
                        htmlFor='propietario'
                        className='text-gray-700 uppercase font-bold text-sm'>Propietario: </label>
                    <input
                        id='propietario'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='propietario'
                        name='propietario'
                        onChange={HandleChange}
                        value={form.propietario || ""}
                    />
                </div>
                <div>
                    <label
                        htmlFor='email'
                        className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                    <input
                        id='email'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='email'
                        name='email'
                        onChange={HandleChange}
                        value={form.email || ""}
                    />
                </div>
                <div>
                    <label
                        htmlFor='celular'
                        className='text-gray-700 uppercase font-bold text-sm'>Celular: </label>
                    <input
                        id='celular'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='celular'
                        name='celular'
                        onChange={HandleChange}
                        value={form.celular || ""}
                    />
                </div>
                <div>
                    <label
                        htmlFor='convencional'
                        className='text-gray-700 uppercase font-bold text-sm'>Convencional: </label>
                    <input
                        id='convencional'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='convencional'
                        name='convencional'
                        onChange={HandleChange}
                        value={form.convencional || ""}
                    />
                </div>

                <div>
                    <label
                        htmlFor='sintomas'
                        className='text-gray-700 uppercase font-bold text-sm'>Sintomas: </label>
                    <textarea
                        id='sintomas'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='sintomas'
                        onChange={HandleChange}
                        value={form.sintomas || ""}
                    />
                </div>

                <input
                    type="submit"
                    className='bg-gray-600 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-900 cursor-pointer transition-all'
                    value='Registrar' />

            </form>
        </div>

    )
}