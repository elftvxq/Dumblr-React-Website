import React, { Component } from 'react';
import PostList from "../post/PostList";
import "./Home.css";
import CreatePost from '../post/CreatePost';
import Navbar from "../components/Navbar";
import axios from 'axios';
import { Redirect } from "react-router-dom";


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
                                <p>Profile...</p>  
                            </div>
                        </div>
                    </div>
            )
        }  
};

export default Home;