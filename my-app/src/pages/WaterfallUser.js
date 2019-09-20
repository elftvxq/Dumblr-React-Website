import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import WaterfallPosts from '../pages/WaterfallPosts';
import WaterfallStaticProfile from '../components/profile/WaterfallStaticProfile';
import Grid from '@material-ui/core/Grid';
import Navbar from '../components/layout/Navbar';
import './waterfallUser.css';

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

export class WaterfallUser extends Component {
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
            <p>Loading data...</p>
        ): screams === null ? (
            <p>No posts from this user</p>
        ) : !screamIdParam ? (
            <WaterfallPosts screams={screams}/>
        ) : (
                screams.screamId !== screamIdParam ? 
                (<WaterfallPosts  scream={screams}/>):
                (<WaterfallPosts scream={screams} openDialog/>)
        )

        return (
            
            <Fragment>
            <Navbar/>
                 <Fragment>
                    {this.state.profile === null ? ( 
                        <p>Loading profile...</p>
                    ):( <WaterfallStaticProfile profile={this.state.profile}/>)}
                </Fragment>
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
