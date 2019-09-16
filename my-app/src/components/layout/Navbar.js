import React, { Component, Fragment } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import "./navbar.css";
import { Link } from "react-router-dom";
import { ReactComponent as Home } from '../../image/home.svg';
import { ReactComponent as Explore } from '../../image/explore.svg';
import { ReactComponent as Notification } from '../../image/flash.svg';
import { ReactComponent as User } from '../../image/people.svg';
import { ReactComponent as Like} from '../../image/like-black.svg';
import PropTypes from 'prop-types';
// import { ReactComponent as Create } from "../../image/create.svg";
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
        backgroundColor: '#14213D'
    },
    appTitle: {
        marginRight: '30px',
        color: '#FFFFFF'
    }
}

class Navbar extends Component {
  
  render() {
    const { classes, authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
            <Typography variant="h6" color="secondary" className={classes.appTitle}>Dumblr</Typography>
              <Search/>
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
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