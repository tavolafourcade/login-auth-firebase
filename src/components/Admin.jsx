import React from 'react'
import { auth } from '../firebase' 
import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'


const Admin = (props) => {
    useEffect(()=>{
        if(auth.currentUser){
            console.log('Existe un usuario')
        } else {
            console.log('No existe el usuario')
            props.history.push('/login')
        }
    },[props.history])

    return (
        <div>
            <h2>Ruta Protegida</h2>
        </div>
    )
}

export default withRouter(Admin)