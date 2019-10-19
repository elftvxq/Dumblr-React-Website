import React, { Component, Fragment } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import "./navbar.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Search from './Search'
import Notifications from "../post/Notifications";
import MyButton from '../../util/MyButton'
//Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
// MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';


const styles ={
    nav: {
        backgroundColor: '#407899',
        opacity: 0.95

    },
    appTitle: {
        marginRight: '30px',
        color: '#FFFFFF',
        fontWeight:'700',
        fontSize:'30px',
        textDecoration:'none',
      '@media (max-width: 414px)': {
        marginRight: '25px',
        fontSize: '20px'
      },
      '@media (max-width: 360px)': {
        marginRight: '15px',
        fontSize: '20px'
      },
      '@media (max-width: 320px)': {
        marginRight: '30px',
        fontSize: '20px',
        fontWeight: '600',
      },
    },
    navsub: {
      '@media (max-width: 414px)': {
        display: 'none'
      },
    }
}

class Navbar extends Component {

  render() {
    const { classes, authenticated } = this.props;
    return (
      <AppBar className={classes.nav}>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
             <Link to="/"> <p className="appTitle">Dumblr</p> </Link>   
              <Search/>
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon className={classes.homeIcon}/>
                </MyButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
            <Typography variant="h6" color="secondary" className={classes.appTitle} component={Link} to="/">Dumblr</Typography>
            <Search/>
              <Button color="inherit" component={Link} to="/login" >
                Login
              </Button>
              <Button color="inherit" component={Link} to="/" className={classes.navsub}>
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup" className='nav-item'>
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}


Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

const mapActionsToProps = { logoutUser };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Navbar));