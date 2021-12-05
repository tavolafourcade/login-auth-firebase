import React from 'react'
import { useState } from 'react'

const Reset = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const procesarDatos = (e) => {
        e.preventDefault()
        if(!email.trim()){
            setError('Ingrese un email')
            console.log('Ingrese un email')
            return
        }

        setError(null)
    }


    return (
        <div className='mt-5'>
            <h3 className="text-center">
                Reiniciar contraseña
            </h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                    {
                        // Para evitar el null en la condicion del operador ternario:
                        error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )
                    }
                    <input 
                        type="email" 
                        className="form-control mb-2"
                        placeholder="Ingrese un email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}/>

                    
                        {/* One button needs to be of type submit while the other is type button */}
                    <button className="btn btn-dark btn-lg btn-block" type="submit">
                        Reiniciar contraseña
                    </button>
                    
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Reset
