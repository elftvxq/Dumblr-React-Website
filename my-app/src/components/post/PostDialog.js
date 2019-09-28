import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import Comments from './Commets';
import CommentForm from './CommentForm';
import './postDialog.css';
//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//Icon
import UnfoldMore from '@material-ui/icons/ChatBubbleOutlineSharp';
// import Chat from '@material-ui/icons/ChatBubbleOutlineSharp';
import CloseIcon from '@material-ui/icons/Close';
import HeartCircle from '../../image/PUN-458-2.jpg';
import CommentCircle from '../../image/chat+chatting+comment+message+three+dots+typing+icon-1320085879344879887.png';
//Redux
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';
import Linkify from 'react-linkify';


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
        objectFit: 'cover',
        border: '3px solid #B3CDD1',
        boxShadow: '0 5px 15px 0px rgba(0, 0, 0, 0.6)'
    },
    dialogContent: {
        padding: 20
    },
    closeButton : {
        position: 'absolute',
        left: '90%',
        '@media (max-width:576px)': {
             left: '86%',
        },
        '@media (max-width:414px)': {
            left: '81%',
        },
        '@media (max-width:320px)': {
            left: '78%',
        },
    },
    expandButton: {
        position: 'absolute',
        left: '88%',
         '@media (max-width:768px)': { 
             left: '85%',
         },
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    gridContent:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'center'
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
        

        const componentDecorator = (href, text, key) => (
            <a href={href} key={key} target="_blank" rel="noopener noreferrer">
                {text}
            </a>
            );

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
             <CircularProgress size={150} thickness={3}/>   
            </div>
        ):( 
            <Grid container spacing={3} className={classes.gridContent}>
                <Grid item sm={4}>
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
                         <Linkify componentDecorator={componentDecorator}><span className="dialog-text">{body}</span></Linkify>

                        <div className="dialogCount">
                             {/* <LikeButton screamId={screamId} /> */}
                        <img src={HeartCircle} alt="like" style={{width: '35px'}}/> <span style={{marginRight:'10px'}}> {likeCount} Likes </span>
                            {/* <MyButton tip="comments">
                                <ChatIcon color="primary"/>
                            </MyButton> */}
                        <img src={CommentCircle} alt="comment" style={{width: '20px', marginRight:'10px'}}/> <span> {commentCount} Comments </span></div>
                        
                        
                       
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

