import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Edit = () => {

    const [ description, setDescription ] = useState('')
    const [ stock, setStock ] = useState(0)

    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const product = doc(db, "products", id)
        const data = {description: description, stock: stock}
        await updateDoc(product, data)
        navigate('/')
    }

    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "products", id) )
        if(product.exists()) {
            //console.log(product.data())
            setDescription(product.data().description)    
            setStock(product.data().stock)
        }else{
            console.log('El producto no existe')
        }
    }

    useEffect( () => {
        getProductById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h3 className="text-center mb-3 mt-2">EDITAR PRODUCTO</h3>
                        <form onSubmit={update}>
                            <div className='mb-3'>
                                <input
                                    value={description}
                                    onChange={ (e) => setDescription(e.target.value)} 
                                    type="text"
                                    className='form-control mb-3'
                                    placeholder="DESCRIPCIÓN"
                                />
                            </div>  

                            <div className='mb-3'>
                                <input
                                    value={stock}
                                    onChange={ (e)=> setStock(e.target.value)} 
                                    type="number"
                                    className='form-control mb-4'
                                    placeholder="STOCK"
                                />                 
                            </div>  
                            <div className="d-grid gap-2">
                                <button 
                                    type='submit' 
                                    className='btn btn-warning btn-block'
                                >
                                    ACTUALIZAR ALMACÉN
                                </button>
                            </div>
                        </form>   
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Edit