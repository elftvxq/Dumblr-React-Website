import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core';
import themeFile from './util/theme';
//components
import AuthRoute from './util/AuthRoute';
//pages
import Home from './pages/Home';
import SignIn from './pages/Signin';
import Signup from './pages/Signup';
import jwtDecoded from 'jwt-decode';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecoded(token);
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/signin';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
      <MuiThemeProvider theme={theme}>
        <div className = 'App'>
      <Router>
       {/* <Navber/> */}
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home}/>
            <AuthRoute exact path='/signin' component={SignIn} authenticated={authenticated}/>
            <AuthRoute exact path='/signup' component={Signup} authenticated={authenticated}/>
          </Switch>
        </div>
      </Router> 
      </div>
      </MuiThemeProvider>
  );
}

export default App;