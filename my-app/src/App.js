import React from 'react';
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
        
            <Router history={ history }>
              {/* <Navber/> */}
              <div className="container">
              {/* <path d="M0,172v-172h172v172z"></path><path d="M143.19336,21.43001c-0.26705,0.00844 -0.53341,0.03181 -0.79785,0.06999h-34.89551c-2.58456,-0.03655 -4.98858,1.32136 -6.29153,3.55376c-1.30295,2.2324 -1.30295,4.99342 0,7.22582c1.30295,2.2324 3.70697,3.59031 6.29153,3.55376h18.53256l-66.59961,66.59961c-1.8722,1.79752 -2.62637,4.46674 -1.97164,6.97823c0.65473,2.51149 2.61604,4.4728 5.12753,5.12753c2.51149,0.65473 5.18071,-0.09944 6.97823,-1.97165l66.59961,-66.59961v18.53255c-0.03655,2.58456 1.32136,4.98858 3.55376,6.29153c2.2324,1.30295 4.99342,1.30295 7.22582,0c2.2324,-1.30295 3.59031,-3.70697 3.55376,-6.29153v-34.9235c0.28889,-2.08845 -0.35639,-4.19816 -1.76411,-5.76769c-1.40772,-1.56953 -3.43507,-2.43964 -5.54253,-2.3788zM35.83333,21.5c-7.83362,0 -14.33333,6.49972 -14.33333,14.33333v100.33333c0,7.83362 6.49972,14.33333 14.33333,14.33333h100.33333c7.83362,0 14.33333,-6.49972 14.33333,-14.33333v-43c0.03655,-2.58456 -1.32136,-4.98858 -3.55376,-6.29153c-2.2324,-1.30295 -4.99342,-1.30295 -7.22582,0c-2.2324,1.30295 -3.59031,3.70697 -3.55376,6.29153v43h-100.33333v-100.33333h43c2.58456,0.03655 4.98858,-1.32136 6.29153,-3.55376c1.30295,-2.2324 1.30295,-4.99342 0,-7.22582c-1.30295,-2.2324 -3.70697,-3.59031 -6.29153,-3.55376z"></path> */}
                <Switch>
                  <Route exact path='/' component={Home}/>
                  <AuthRoute exact path='/login' component={SignIn}/>
                  <AuthRoute exact path='/signup' component={Signup}/>
                  <Route exact path='/users/:handle' component={WaterfallUser} history={history}/>
                  <Route exact path='/users/:handle/scream/:screamId' component={WaterfallUser} />
                </Switch>
              </div>
            </Router> 
        
      </Provider>
      </MuiThemeProvider>
  );
}

export default App;