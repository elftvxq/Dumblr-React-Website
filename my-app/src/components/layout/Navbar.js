import React, { Component, Fragment } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import "./navbar.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Search from './Search'
import Notifications from "../Notifications"
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
        // backgroundColor: '#14213D'
        backgroundColor: '#407899',
        // backgroundColor: '#084C61',
        opacity: 0.95

    },
    appTitle: {
        marginRight: '30px',
        color: '#FFFFFF',
        fontWeight:'700',
      '@media (max-width:375px)': {
        marginRight: '10px',
      },
    },
    // homeIcon:{
    //   padding: '10px'
    // }
}

class Navbar extends Component {

  
  render() {
    const { classes, authenticated } = this.props;
    return (
      <AppBar className={classes.nav}>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
            <Typography variant="h6" color="secondary" className={classes.appTitle} component={Link} to="/">Dumblr</Typography>
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
              <Button color="inherit" component={Link} to="/login" className='nav-item'>
                Login
              </Button>
              <Button color="inherit" component={Link} to="/" className='nav-item'>
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