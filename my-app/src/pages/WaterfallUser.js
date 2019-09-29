import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import WaterfallPosts from '../pages/WaterfallPosts';
import WaterfallStaticProfile from '../components/profile/WaterfallStaticProfile';
import Navbar from '../components/layout/Navbar';
import './waterfallUser.css';
import Posts from '../components/post/PostList';
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class WaterfallUser extends Component {
    state =  {
        profile: null,
        screamIdParam: null
    }

    
    componentWillMount() {
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if(screamId) this.setState({ screamIdParam: screamId}) 

        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then((res) => {
                this.setState({
                    profile:res.data.user
                })
                console.log(this.state);
            })
            .catch((err) => console.log(err));
    };
    
    render() {
        const { screams, loading } = this.props.data;
        const { screamIdParam } = this.state;

        // const postMarkup = loading ? (
        //     <p>Loading data...</p>
        // ): screams === null ? (
        //     <p>No posts from this user</p>
        // ) : !screamIdParam ? (
        //     screams.map(scream => <WaterfallPosts key={scream.screamId} scream={scream}/>)
        // ) : (
        //     screams.map(scream => {
        //         if(scream.screamId !== screamIdParam)
        //         return <WaterfallPosts key={scream.screamId} scream={scream}/>
        //         else return <WaterfallPosts key={scream.screamId} scream={scream} openDialog/>
        //     })
        // )

        const postMarkup = loading ? (
             <div className="loading">
                <p className="loadText">Loading</p>
            </div>
        ): this.state.screams === null ? (
            <p style={{color:'white'}}>No posts from this user</p>
        ) : !screamIdParam ? (
            <WaterfallPosts screams={screams}/>
        ) : (
                screams.map(scream => {
                if(scream.screamId !== screamIdParam)
                return <Posts key={scream.screamId} scream={scream}/>
                else return <Posts key={scream.screamId} scream={scream} openDialog/>
            })
        )

        return (
            
            <Fragment>
            <Navbar/>
                <div className="main-profile">
                    {this.state.profile === null ? ( 
                        <div className="loader"><span className="loader-inner"></span></div>
                    ):( <WaterfallStaticProfile profile={this.state.profile}/>)}
                </div>
                <Fragment>
                    {postMarkup}
                </Fragment>
               
            </Fragment>
        )
    }
}

WaterfallUser.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, { getUserData })(WaterfallUser);
