import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import Comments from './Commets';
//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LikeButton from './LikeButton';
import ChatIcon from '@material-ui/icons/Chat';
//Icon
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';

//Redux
import { connect } from 'react-redux';
import { getScream } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    
    invisibleSeperator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height:150,
        width:150,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton : {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    gridContent:{
        display: 'flex',
        flexWrap: 'wrap'
    }
});

class PostDialog extends Component {

    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.props.getScream(this.props.screamId);
    };

     handleClose = () => {
        this.setState({ open: false })
    };

    render(){
        const { classes, scream :  { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, UI:{ loading } } = this.props;
        
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
             <CircularProgress size={200} thickness={2}/>   
            </div>
        ):( 
            <Grid contianer spacing={16} className={classes.gridContent}>
                <Grid item sm={5}>
                    <img src={userImage} alt="profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to ={`users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeperator}/>
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeperator}/>
                         <Typography variant="body2">{body}</Typography>

                         <Typography variant="body2" >
                         <LikeButton screamId={screamId}/>
                         <span>{likeCount} 個喜歡</span>
                         <MyButton tip="comments">
                             <ChatIcon color="primary"/>
                         </MyButton>
                         <span>{commentCount} 個留言</span>
                         </Typography>
                </Grid>
                <hr className={classes.invisibleSeperator}/>
                <Comments comments={comments}/> 
            </Grid>
        )
    return (
        <Fragment>
            <MyButton onClick={this.handleOpen} tip="Expand post" tipClassName={classes.expandButton}>
                <UnfoldMore color='primary'/>
            </MyButton>
            <Dialog 
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm">
            
            <MyButton 
                tip="Close"
                onClick={this.handleClose}
                tipClassName={classes.closeButton}
            >
                <CloseIcon/>
                </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
                </Dialog>
        </Fragment>
     )
    
    }
};

PostDialog.porpTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));

