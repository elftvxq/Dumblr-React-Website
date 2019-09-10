import React, { Component } from 'react';
import PostList from "../post/PostList";
import "./Home.css";
import axios from 'axios';
import { Redirect } from "react-router-dom";
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
            // const { screams } = this.props;
      
            return(
                
                    <div className="main">
                        <Navbar/>
                        <div className="main-content">
                             <div className="left">
                                <CreatePost/>
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

export default Home;