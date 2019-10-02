import  { createBrowserHistory } from 'history';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

export const history = createBrowserHistory();

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
});

const exampleMiddleware = store => next => action => {
    // if (action.type === 'message'){
    //   do something
    // } else {
    //   next(action);
    // }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//     reducers, 
//     initialState, 
//     compose(applyMiddleware(...middleware), 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
);

export default store;