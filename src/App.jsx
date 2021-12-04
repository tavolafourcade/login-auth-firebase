import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Admin from './components/Admin'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
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
  );
}

export default App;
