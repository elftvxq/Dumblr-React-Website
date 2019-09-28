import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";
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
import User from './pages/user';
import WaterfallUser from './pages/WaterfallUser';
import history from './util/history'


const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = "https://us-central1-react-personal-project.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecoded(token);
  // console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token; 
    store.dispatch(getUserData());
  }
};

class App extends Component {
  
  render(){
    return (
      <MuiThemeProvider theme={theme}>
      <Provider store={store}>
  
            <Router history={ history }>
              {/* <Navber/> */}
                 
                    <div className="container">
                     
                      <Switch>
                        <Route exact path='/' component={Home}/>
                        <AuthRoute exact path='/login' component={SignIn}/>
                        <AuthRoute exact path='/signup' component={Signup}/>
                        <Route exact path='/users/:handle' component={WaterfallUser} history={history}/>
                        <Route exact path='/users/:handle/scream/:screamId' component={User} />
                      </Switch>
                      
                    </div>
                  
                  
             
              
            </Router> 
        
      </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;