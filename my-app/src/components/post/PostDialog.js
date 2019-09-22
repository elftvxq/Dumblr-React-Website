import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import Comments from './Commets';
import CommentForm from './CommentForm';
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
import { getScream, clearErrors } from '../../redux/actions/dataActions';



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
    open: false,
    oldPath: '',
    newPath: ''
    };
        componentDidMount() {
            if (this.props.openDialog) {
            this.handleOpen();
            }
        }
        handleOpen = () => {
            let oldPath = window.location.pathname;

            const { userHandle, screamId } = this.props;
            const newPath = `/users/${userHandle}/scream/${screamId}`;

            if (oldPath === newPath) oldPath = `/users/${userHandle}`;

            window.history.pushState(null, null, newPath);

            this.setState({ open: true, oldPath, newPath });
            this.props.getScream(this.props.screamId);
        };
        handleClose = () => {
            window.history.pushState(null, null, this.state.oldPath);
            this.setState({ open: false });
            this.props.clearErrors();
        };
    render(){
        const { classes, scream :  { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, UI:{ loading } } = this.props;
        
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
             <CircularProgress size={200} thickness={2}/>   
            </div>
        ):( 
            <Grid container spacing={2} className={classes.gridContent}>
                <Grid item sm={5}>
                    <img src={userImage} alt="profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h6"
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
                         <span>{likeCount} Likes </span>
                         <MyButton tip="comments">
                             <ChatIcon color="primary"/>
                         </MyButton>
                         <span>{commentCount} Comments </span>
                         </Typography>
                </Grid>
                <hr className={classes.invisibleSeperator}/>
                <CommentForm screamId={screamId}/>
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
    clearErrors: PropTypes.func.isRequired,
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
    getScream,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));

