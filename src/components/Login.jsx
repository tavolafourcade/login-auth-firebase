import React, {useState, useCallback} from 'react'
import { auth, db } from '../firebase'
import { withRouter } from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState('prueba@prueba.com')
    const [pass, setPass] = useState('12345678')
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(false)

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

        if(esRegistro){
            registrar()
        } else {
            login()
        }
    }
    // Login for a registered user

    const login = useCallback(
        async () => {
            try {
                const res = await auth.signInWithEmailAndPassword(email, pass)
                console.log(res.user)
                setEmail('')
                setPass('')
                setError('')
                props.history.push('/admin')
            } catch (error) {
                console.log(error)
                if (error.code === 'auth/invalid-email')
                    setError('Email incorrecto')
                if (error.code === 'auth/wrong-password')
                    setError('Contraseña incorrecta')
                if (error.code === 'auth/user-not-found')
                    setError('No existe el usuario')
            }
        },
        [email,pass, props.history]
    )
    // Create a new account with email and password
    const registrar = useCallback(
        async () => {
            try {
                const res = await auth.createUserWithEmailAndPassword(email, pass)
                // Adding to db collection the user id
                await db.collection('usuarios').doc(res.user.email).set({
                    email: res.user.email,
                    uid: res.user.uid
                })
                // Creating a specific collection for an user that's registering.
                await db.collection(res.user.uid).add({
                    name: 'Tarea de Ejemplo',
                    fecha: Date.now()
                })
                setEmail('')
                setPass('')
                setError('')
                props.history.push('/admin')
                console.log(res.user)
            } catch (error) {
                console.log(error)
                if (error.code === 'auth/invalid-email')
                    setError('Email no válido')
                if (error.code === 'auth/email-already-in-use')
                    setError('Email ya utilizado')
            }
        },
        [email, pass, props.history]
    )

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
                    {!esRegistro? (
                        <button 
                        className="btn btn-lg btn-sm mt-2 btn-danger"
                        onClick={()=> props.history.push('/reset')}
                        type="button">
                            Recuperar contraseña
                        </button>
                    ) : null }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
