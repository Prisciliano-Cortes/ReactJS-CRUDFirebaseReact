import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Show = () => {

    // 1. Configuramos los hooks
    const [ products, setProducts ] = useState([]);

    // 2. Referencia a la BD Firestore
    const productCollection = collection(db, "products");

    // 3. Función para mostrar todos los docs
    const getProducts = async() => {
        const data = await getDocs(productCollection);

        setProducts(
            data.docs.map( (doc) => ({
                ...doc.data(),
                id: doc.id
            }))
        )
    }

    // 4. Función para eliminar un doc
    const deleteProduct = async(id) => {
        const productDoc = doc(db, "products", id);
        await deleteDoc(productDoc);
        getProducts();
    } 

    // 5. Función de confirmación para sweet alert 2
    const confirmDelete = (id) => {
        MySwal.fire({
          title: '¿Elimina el producto?',
          text: "Recuerda que el producto será borrado permanentemente",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.isConfirmed) { 
                //llamamos a la función para eliminar   
                deleteProduct(id)               
                Swal.fire(
                    'Eliminado',
                    'El producto ha sido eliminado',
                    'success'
                )
            }
        })    
    }

    // 6. usamos el useEffect 
    useEffect( () => {
        getProducts();
        //eslint-disable-next-line
    }, [])

    // 7. Devolvemos la vista de nuestor componente3
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-grid gap-2'>
                            <Link to="/create" className='btn btn-secondary mt-2 mb-3'>
                                CREAR
                            </Link>
                        </div>

                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>DESCRIPCIÓN</th>
                                    <th>STOCK</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    products.map( (product) => (
                                        <tr key={product.id}>
                                            <td> {product.description} </td>
                                            <td> {product.stock } </td>
                                            <td> 
                                                <Link 
                                                    to={`/edit/${product.id}`}
                                                    className='btn btn-light float-right mx-3'
                                                >
                                                    <i className='fa-solid fa-pencil'></i>
                                                </Link>
                                                <button
                                                    onClick={() => {confirmDelete(product.id)}}
                                                    className='btn btn-danger float-right'
                                                >
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Show