import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

const Create = () => {

    const [description, setDescription] = useState('');
    const [stock, setstock] = useState(0);

    const navigate = useNavigate();

    const productCollection = collection(db, 'products');

    const store = async(e) => {
        e.preventDefault();
        await addDoc( productCollection, { description: description, stock: stock })
        navigate('/');
    }
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h3 className="text-center mb-3 mt-2">Agregar producto</h3>
                        <form onSubmit={ store }>
                            <div className='mb-3'>
                                <input 
                                    type="text"
                                    value={description}
                                    onChange={ (e) => setDescription(e.target.value)}
                                    className='form-control mb-3'
                                    placeholder='Descripción'
                                />

                                <input 
                                    type="number"
                                    value={stock}
                                    onChange={ (e) => setstock(e.target.value)}
                                    className='form-control mb-4'
                                    placeholder='Stock'
                                />
                                
                                <div className="d-grid gap-2">
                                    <button
                                        type='submit'
                                        className='btn btn-primary btn-block'
                                    >
                                        GUARDAR DATOS
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Create