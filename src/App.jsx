import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Admin from './components/Admin'
import { auth } from './firebase' 
import { useState, useEffect } from 'react'


function App() {
  const [firebaseUser, setFirebaseUser] = useState(false)

  //Console log if the user exists and setting the user in the State
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      if(user){
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })
  }, [])
  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUser={firebaseUser}/>
        {/* Estableciendo los componentes dinamicos */}
        <Switch>
          {/* Route envuelve el componente dinamico, se debe ir de lo mas especifico a lo mas general o agregarle exact */}
          <Route path='/login'>
            <Login/>
          </Route>

          <Route path='/admin'>
            <Admin/>
          </Route>

          <Route path='/'>
            inicio
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Cargando...</p>
  )
}

export default App;
