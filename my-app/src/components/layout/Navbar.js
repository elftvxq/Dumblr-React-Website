import React, { Component, Fragment } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { ReactComponent as Home } from '../../image/home.svg';
import { ReactComponent as Explore } from '../../image/explore.svg';
import { ReactComponent as Notification } from '../../image/flash.svg';
import { ReactComponent as User } from '../../image/people.svg';
import { ReactComponent as Like} from '../../image/like-black.svg';
import Logo from '../../image/Dumblr.png';
import PropTypes from 'prop-types';
// import { ReactComponent as Create } from "../../image/create.svg";
import Search from './Search'
import Notifications from "../Notifications";
//Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
// MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from '@material-ui/core/styles/withStyles';

const styles ={
    nav: {
        backgroundColor: '#14213D'
    }
}

class Navbar extends Component {

     state = {
         displayMenu: false,
         displayNotification: false,
         lock: false
     };

     showDropdownMenu = (event) => {
         event.preventDefault();
         this.setState({
             displayMenu: true
         }, () => {
             document.addEventListener('click', this.hideDropdownMenu);
         });
     }

     hideDropdownMenu = ()=> {
         this.setState({
             displayMenu: false
         }, () => {
             document.removeEventListener('click', this.hideDropdownMenu);
         });
     }

     showNotification = (e) => {
         e.preventDefault();
         console.log('點到icon');
         this.setState({
            displayNotification: true
         }, () => {
             document.addEventListener('click', this.hideNotification);
         });
     }

     hideNotification = () => {
         this.setState({
             displayNotification: false
         }, () => {
             document.removeEventListener('click', this.hideNotification);
         });
     }

     handleLogout=()=>{
         this.props.logoutUser();
     }

    
    render(){
      
      const { classes, authenticated } = this.props;  

      return(
          
           <AppBar className="navbar">
                <Toolbar >
                    { authenticated ? (
                        <Fragment>    
                    

                        <div className="headLeft">
                        <Link to="/" className="brandlogo">Dumblr</Link>
                        <Search/></div>

                        <div className="navicons">
                            <Link to="/" ><Home className="navicon" title="Home"/></Link>
                            <Link to="/explore"><Explore className="navicon" title="Explore"/></Link>
                            <div className="notice-list"><Notification className="navicon" title="Notification" onClick={this.showNotification}/>
                                { this.state.displayNotification ? (<Notifications/>):(null) }</div>

                            <div className="dropdown">
                                <div ><User className="navicon" title="User Center" onClick={this.showDropdownMenu}/></div>

                                    { this.state.displayMenu ? (
                                        <ul>
                                            <div className="menu-header"><p>帳號</p><a className="logout" href="#" onClick={this.handleLogout}>登出</a></div>
                                            <li className="menu-sub"><a href="#"> <Like/> 喜歡</a><p className="menu-num">30</p></li>
                                            <li className="menu-sub"><a href="#">追蹤中</a><p className="menu-num">28</p></li>
                                            <li className="menu-sub"><a href="#Setting">你的帳號</a></li>
                                        </ul>
                                        ) : (null)
                                    }

                            </div>
                        </div>
                   
                </Fragment>
        
                    ): (
                        <Fragment>
                            <Button color='inherit' component={Link} to='/signin'>
                            Login
                            </Button>
                            <Button color='inherit' component={Link} to='/'>
                                Home
                            </Button>
                            <Button color='inherit' component={Link} to='/signup'>
                                Signup
                            </Button>
                        </Fragment>
                        
                    )}
                </Toolbar>
           </AppBar>
    
           
                
                    

                
        )  
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