import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import Posts from "../components/post/PostList";
import "./Home.css";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
//Component
import CreatePost from '../components/post/CreatePost';
import Navbar from '../components/layout/Navbar';
import Profile from '../components/profile/Profile';



class Home extends Component {
   

        componentDidMount(){
           this.props.getScreams();
        }

        render(){
            
            const { classes, screams, loading } = this.props.data;          
            const { authenticated } = this.props;
            
            let recentPosts = !loading ? (
                screams.map((scream) => <Posts key={scream.screamId} scream={scream} />)
            ) : (
                <p>Loading...</p>
            )
            return(
                
                    <Fragment>
                        <Navbar/>
                        <div className="main-content">
                             <div className="left">
                             { authenticated ? (
                                 <CreatePost/>
                             ):( null )}
                            {recentPosts}
                                
                            </div>
                            <div className="right">
                                <Profile/>
                            </div>
                        </div>
                    </Fragment>
            )
        }  
};

Home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    data: state.data
});

export default connect(mapStateToProps, { getScreams })(Home);