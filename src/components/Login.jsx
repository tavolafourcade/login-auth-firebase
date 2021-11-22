import React, {useState} from 'react'

const Login = () => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(true)

    const procesarDatos = (e) => {
        e.preventDefault()
        if(!email.trim()){
            setError('Ingrese un email')
            console.log('Ingrese un email')
            return
        }

        if(!pass.trim()){
            setError('Ingrese una contraseña')

            console.log('Ingrese una contraseña')
            return
        }

        if(pass.length < 6){
            setError('La contraseña debe tener al menos 6 caracteres')

            console.log('La contraseña debe tener al menos 6 caracteres')
            return
        }
        setError(null)
    }


    return (
        <div className='mt-5'>
            <h3 className="text-center">
                {esRegistro? 'Registro de Usuarios' : 'Login de acceso'}
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

                    <input 
                        type="password" 
                        className="form-control mb-2"
                        placeholder="Ingrese una contraseña"
                        onChange={e => setPass(e.target.value)}
                        value={pass}/>
                        {/* One button needs to be of type submit while the other is type button */}
                    <button className="btn btn-dark btn-lg btn-block" type="submit">
                        {esRegistro? 'Registrarme' : 'Iniciar Sesión'}
                    </button>
                    <button 
                        className="btn btn-info btn-sm btn-block"
                        onClick={()=> setEsRegistro(!esRegistro)}
                        type="button">
                        {esRegistro? '¿Ya tienes cuenta?' : 'Quiero registrarme'}
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
