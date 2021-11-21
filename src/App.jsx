import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="container">
        navbar...
        {/* Estableciendo los componentes dinamicos */}
        <Switch>
          {/* Route envuelve el componente dinamico, se debe ir de lo mas especifico a lo mas general o agregarle exact */}
          <Route path='/login'>
            login
          </Route>

          <Route path='/admin'>
            admin
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
