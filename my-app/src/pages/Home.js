import React, { Component } from 'react';
import PostList from "../post/PostList";
import "./Home.css";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
//Component
import CreatePost from '../post/CreatePost';
import Navbar from "../components/Navbar";
import Profile from '../components/Profile';


class Home extends Component {

        state = {
            screams: null
        }    

        componentDidMount(){
            axios.get('/screams')
            .then((res)=>{
                console.log(res.data)
              this.setState({
                  screams: res.data
              })  
            })
            .catch((err)=> console.log(err));
        }

        render(){
            console.log(this.state);  
            const { classes, authenticated } = this.props;          
            // const { screams } = this.props;
      
            return(
                
                    <div className="main">
                        <Navbar/>
                        <div className="main-content">
                             <div className="left">
                             { authenticated ? (
                                 <CreatePost/>
                             ):( null )}
                                
                                <PostList screams={this.state.screams}/>
                            </div>
                            <div className="right">
                                <Profile/>
                            </div>
                        </div>
                    </div>
            )
        }  
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Home);