import React, { Component, Fragment } from "react";
import "./postList.css";
// import { ReactComponent as Comment } from "../image/chat.svg";
// import { ReactComponent as Retweet } from "../image/retweet.svg";
// import { ReactComponent as Heart } from "../image/heart.svg";
// import { ReactComponent as Liked } from "../image/like.svg";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Reply from './Reply';
// import DeleteScream from './DeleteScream';
import DeleteScream from "./DeleteScream";
import PostDailog from './PostDialog';
import LikeButton from './LikeButton';
//Redux
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//MUI
import MyButton from '../../util/MyButton';

import ChatIcon from '@material-ui/icons/Chat';
import Typography from '@material-ui/core/Typography';

const styles = (theme)=> ({

});

class Posts extends Component {

     
    state = {
        displayReply: false,
        key: ""
    };

    showReply=(id)=>{
        // console.log(id);
        
        this.setState({
            displayReply:true, key:id }, ()=>{
            // document.addEventListener('click', this.hideReply);    
        });
    }

    hideReply=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            displayReply: false}, ()=>{
                // document.removeEventListener('click', this.hideReply);
            });
    }

    render(){
        const { classes, user: { authenticated, credentials: { handle } }, scream: { body, createdAt, userImage, userHandle, title, pictureUrl, screamId, likeCount, commentCount, tags} } = this.props;
        dayjs.extend(relativeTime);
        console.log(this.props);

        // //Hashtag陣列
        let hash = '';
        if (tags && tags.length > 0) {
            tags.forEach(item => {
            hash += item + " ";  
                });
        } else {
            hash = "";
        };

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ): null 

        
                
        //該貼文回覆
        let reply;
            if (this.state.displayReply && this.state.key === screamId) {
                reply = <div> 
                        <Reply key={screamId}/> 
                        <div className="mask" onClick={this.hideReply}></div>
                        </div> ;
                   } else { reply = null; }

        return (
            <div className="post-body">
                <div className="pic-wrapper">
                        <img className="user-pic" src={userImage} alt=""/>
                </div>
                
                <div className="post-card" >
                    <Link to={`/users/${userHandle}`} className="user-id">{userHandle}</Link>
                    {deleteButton} 
                    <p className="post-time">{dayjs(createdAt).fromNow()}</p>
                    <p className="card-title">{title}</p>
                    <img className="mainImage" src={pictureUrl} alt=""/>
                    <div>
                      <p className="card-content">{body}</p>
                      <span className="card-hashtag">{hash}</span>  
                    </div>
                    
                    
                    {/* <div className="post-details">
    
                        <span>{`${commentCount}則迴響 `}</span>
                        <MyButton tip="comments">
                            <ChatIcon color="primary"/>
                        </MyButton> */}
                        {/* <div className="interact-icons"> */}
                            {/* <Comment className="interact-icon" onClick={()=>{this.showReply(screamId)}}/> */}
{/*                             
                            <div className="reply-box" screamid={screamId} userhandle={userHandle}>
                                {reply}
                            </div> */}

                            {/* <Retweet className="interact-icon"/> */}
                            {/* <span>{`${likeCount}個喜歡`}</span>
                            <LikeButton screamId={screamId}/>
                            <PostDailog screamId={screamId} userHandle={userHandle}/>  */}
                        {/* </div> */}

                    {/* </div> */}

                        <LikeButton screamId={screamId} />
                        <span>{likeCount} Likes</span>
                        <MyButton tip="comments">
                            <ChatIcon color="primary" />
                        </MyButton>
                        <span>{commentCount} comments</span>
                        <PostDailog
                            screamId={screamId}
                            userHandle={userHandle}
                            openDialog={this.props.openDialog}
                        />
                </div>            
            </div>
        )       
    }
}

Posts.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.user  
})


export default connect(mapStateToProps)(withStyles(styles)(Posts));