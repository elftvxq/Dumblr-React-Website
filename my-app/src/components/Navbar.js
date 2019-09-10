import React, { Component } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { ReactComponent as Home } from '../image/home.svg';
import { ReactComponent as Explore } from '../image/explore.svg';
import { ReactComponent as Notification } from '../image/flash.svg';
import { ReactComponent as User } from '../image/people.svg';
import { ReactComponent as Like} from '../image/like-black.svg';
import Logo from '../image/Dumblr.png';
// import { ReactComponent as Create } from "../../image/create.svg";
import Search from './Search'
import Notifications from "../components/Notifications";

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

    
    render(){
      
      return(
    
            <React.Fragment>
                <div className="navbar">
                     <div className="headLeft">
                    <Link to="/" className="brandlogo">Dumblr</Link>
                    <Search/>
                </div>
                <div className="navicons">
                    <Link to="/" ><Home className="navicon" alt=""/></Link>
                    <Link to="/explore"><Explore className="navicon" alt=""/></Link>
                    <div className="notice-list"><Notification className="navicon" alt="" onClick={this.showNotification}/>
                    
                        { this.state.displayNotification ? (<Notifications/>):(null) }
                    </div>

                    <div className="dropdown">
                        <div ><User className="navicon" alt="" onClick={this.showDropdownMenu}/></div>
                            {/* <div className="createPost">
                                <Create className = "navicon createPosts" alt=""/>
                            </div> */}

                     { this.state.displayMenu ? (
                        <ul>
                            <div className="menu-header"><p>帳號</p><a className="logout" href="#">登出</a></div>
                            <li className="menu-sub"><a href="#"> <Like/> 喜歡</a><p className="menu-num">30</p></li>
                            <li className="menu-sub"><a href="#">追蹤中</a><p className="menu-num">28</p></li>
                            <li className="menu-sub"><a href="#Setting">你的帳號</a></li>
                        </ul>
                        ):
                            (null)
                    }

                    </div>
                </div>
                </div>
               
                    
                
            </React.Fragment>
        
        )  
    }
    
}


export default Navbar;