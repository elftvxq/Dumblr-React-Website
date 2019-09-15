import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core';
import themeFile from './util/theme';
import jwtDecoded from 'jwt-decode';
//Redux
import { Provider } from "react-redux";
import store from './redux/store';
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from './redux/actions/userActions';
//Components
import AuthRoute from './util/AuthRoute';
//Pages
import Home from './pages/Home';
import SignIn from './pages/Signin';
import Signup from './pages/Signup';
import axios from 'axios';
import user from './pages/user';


const theme = createMuiTheme(themeFile);


const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecoded(token);
  // console.log(decodedToken);
  if(decodedToken.exp * 1001 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/signin';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token; 
    store.dispatch(getUserData());
  }
};

function App() {
  return (
      <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        
            <Router>
              {/* <Navber/> */}
              <div className="container">
                <Switch>
                  <Route exact path='/' component={Home}/>
                  <AuthRoute exact path='/signin' component={SignIn}/>
                  <AuthRoute exact path='/signup' component={Signup}/>
                  <Route exact path='/users/:handle' component={user}/>
                  <Route exact path='/users/:handle/scream/:screamId' component={user}/>
                </Switch>
              </div>
            </Router> 
        
      </Provider>
      </MuiThemeProvider>
  );
}

export default App;