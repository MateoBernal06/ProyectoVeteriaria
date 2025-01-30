import { useState } from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

export const Register = () => {

    //Paso 1

    const [form, setform] = useState({
        nombre:"",
        apellido:"",
        direccion:"",
        telefono:"",
        email:"",
        password:""
    })

    //Paso 2
const handleChange = (e) => { 
    setform({
        ...form,
        [e.target.name]:e.target.value
    })
 }


    //Paso 3

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const url =`${import.meta.env.VITE_BACKEND_URL}/registro`
            const respuesta = await axios.post(url, form)
            toast.success(respuesta.data.msg)
            console.log(respuesta)
        }catch(error){
            console.log(error)
            toast.error(error.response.data.msg)
        }
     }
    
    return (
        <>
            <div className="bg-white flex justify-center items-center w-1/2">
            <ToastContainer />
                <div className="md:w-4/5 sm:w-full">

                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">Welcome</h1>
                    <small className="text-gray-400 block my-4 text-sm">Please enter your details</small>


                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Name</label>
                            <input type="name" name="nombre" value={form.nombre||""} onChange={handleChange} placeholder="Enter you name" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Lastname</label>
                            <input type="name" name="apellido" value={form.apellido||""} onChange={handleChange} placeholder="Enter you lastname" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Address</label>
                            <input type="address" name="direccion" value={form.direccion||""} onChange={handleChange} placeholder="Enter you address" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Email</label>
                            <input type="email" name="email" value={form.email||""} onChange={handleChange} placeholder="Enter you email" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                        </div>


                        
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Telefono</label>
                            <input type="text" name="telefono" value={form.telefono||""} onChange={handleChange} placeholder="Enter you phone" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                        </div>


                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Password</label>
                            <input type="password" name="password" value={form.password||""} onChange={handleChange} placeholder="********************" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                        </div>

                        <div className="mb-3">
                            <button className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Register
                            </button>
                        </div>

                    </form>


                    <div className="mt-5 text-xs border-b-2 py-4 ">
                    </div>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>You've already an account?</p>
                        <Link to="/login" className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 ">Login</Link>
                    </div>


                </div>

            </div>

            <div className="w-1/2 h-screen bg-[url('/public/images/dogregister.jpg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden
            ">
            </div>
        </>
    )
}
