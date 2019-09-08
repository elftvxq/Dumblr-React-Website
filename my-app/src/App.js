import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import Signup from './pages/Signup'
import Navber from './components/Navbar'

function App() {
  return (
    
      <div className = 'App'>
      <Router>
       {/* <Navber/> */}
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/signin' component={SignIn}/>
            <Route exact path='/signup' component={Signup}/>
          </Switch>
        </div>
      </Router> 
      </div>
    
    
  );
}

export default App;