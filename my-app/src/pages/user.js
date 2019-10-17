import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Posts from '../components/post/PostList';
import Profile from '../components/profile/Profile';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Navbar from '../components/layout/Navbar';

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";



const styles = {
    gridProfile:{
        marginTop: '60px',
        flexWrap: 'wrap-reverse'
    }
}

export class user extends Component {
    state =  {
        profile: null,
        screamIdParam: null
    }

    
    UNSAFE_componentWillMount() {
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
        const { classes } = this.props;

        const postMarkup = loading ? (
                <div className="loading">
                    <p className="loadText">Loading</p>
                </div>
        ): screams === null ? (
            <p>No posts from this user</p>
        ) : !screamIdParam ? (
            screams.map(scream => <Posts key={scream.screamId} scream={scream}/>)
        ) : (
            screams.map(scream => {
                if(scream.screamId !== screamIdParam)
                return <Posts key={scream.screamId} scream={scream}/>
                else return <Posts key={scream.screamId} scream={scream} openDialog/>
            })
        )

        return (
            
            <Grid container spacing={4} className={classes.gridProfile}>
            <Navbar/>
            <Grid item sm={8} xs={12}>
                {postMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
               {this.state.profile === null ? ( 
                   <div className="loader"><span className="loader-inner"></span></div>

               ):( <Profile profile={this.state.profile}/>

               )}
            </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, { getUserData })(withStyles(styles)(user));

