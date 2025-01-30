import axios from "axios";
import { use } from "react";
import { createContext, useState } from "react";

const TratamientosContext = createContext()

const TratamientosProvider = ({ children }) => {

    const [tratamientos, setTratamientos] = useState([])

    const [modal, setModal] = useState(false)

    const handleModal = () => {
        setModal(!modal)
    }

    const registrarTratamientos = async (datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = "http://localhost:3000/api/tratamiento/registro"
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, datos, options)
            setTratamientos([respuesta.data.tratamiento, ...tratamientos])


        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Vas a eliminar, ¿Estás seguro?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `http://localhost:3000/api/tratamiento/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.delete(url, options)
                const tratamientosActualizados = tratamientos.filter(tratamiento => tratamiento._id !=id)
                
                setTratamientos(tratamientosActualizados)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleStatus = async (id) => {
        try {
            const confirmar = confirm("Vas a finalizar el tratamiento, ¿Estás seguro?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `http://localhost:3000/api/tratamiento/estado/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.post(url, {}, options)
                const tratamientosActualizados = tratamientos.filter(tratamiento => tratamiento._id !=id)
                setTratamientos(tratamientosActualizados)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <TratamientosContext.Provider value={{
                modal,
                setModal,
                handleModal,
                tratamientos,
                setTratamientos,
                registrarTratamientos,
                handleDelete,
                handleStatus
            }} >
                {children}
            </TratamientosContext.Provider>

        </>
    )

}

export { TratamientosProvider }

export default TratamientosContext