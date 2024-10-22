import React from "react";
import { Route, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';


const AuthRoute = ({ component: Component, authenticated, ...rest}) => (
    <Route
        {...rest}
        render={(props) => 
            authenticated === true ? <Redirect to="/" /> : <Component {...props} />
            }
    />
);

const mapStatoToProps = (state) => ({
    authenticated: state.user.authenticated
});

AuthRoute.propTypes = {
    user: PropTypes.object
};

export default connect(mapStatoToProps)(AuthRoute);