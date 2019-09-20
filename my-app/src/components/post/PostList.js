import React, { Component } from "react";
import "./postList.css";
// import { ReactComponent as Comment } from "../image/chat.svg";
// import { ReactComponent as Retweet } from "../image/retweet.svg";
// import { ReactComponent as Heart } from "../image/heart.svg";
// import { ReactComponent as Liked } from "../image/like.svg";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
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
import { ReactTinyLink } from 'react-tiny-link';


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
        const {
            user: {
                authenticated,
                credentials: {
                    handle
                }
            },
            scream: {
                type,
                body,
                createdAt,
                userImage,
                userHandle,
                title,
                pictureUrl,
                screamId,
                likeCount,
                commentCount,
                tags,
                linkUrl
            }
        } = this.props;

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
        
        // const linkPost = linkUrl && type === 'link' ? (
        //     <ReactTinyLink
        //     cardSize="large"
        //     showGraphic={true}
        //     maxLine={2}
        //     minLine={1}
        //     url = {linkUrl}
        //   />
        // ) : null

                
        //該貼文回覆
        // let reply;
        //     if (this.state.displayReply && this.state.key === screamId) {
        //         reply = <div> 
        //                 <Reply key={screamId}/> 
        //                 <div className="mask" onClick={this.hideReply}></div>
        //                 </div> ;
        //            } else { reply = null; }

        if (type === "text") {
             return (
                    <div className="post-body">
                        <div className="pic-wrapper">
                                <img className="user-pic" src={userImage} alt="user profile"/>
                        </div>
                    
                        <div className="post-card" >
                            <Link to={`/users/${userHandle}`} className="user-id">{userHandle}</Link>
                            {deleteButton} 
                            <p className="post-time">{dayjs(createdAt).fromNow()}</p>

                            {(title === "") ?
                            null : <p className="card-title">{title}</p>}
                            
                            {(pictureUrl === null) ?
                            null : <img className="mainImage" src={pictureUrl} alt=""/>}
                            
                            <div className='body-content'>
                                <span className="card-content"><pre style={{fontFamily:"Helvetica Neue,HelveticaNeue,Helvetica,Arial,sans-serif"}}>{body}</pre></span>
                                <span className="card-hashtag">{hash}</span>  
                            </div>
                                <LikeButton screamId={screamId} />
                                <span>{likeCount} Likes</span>
                                <MyButton tip="comments">
                                    <ChatIcon color="primary" />
                                </MyButton>
                                <span>{commentCount} comments</span>
                                <PostDailog
                                    screamId={screamId}
                                    userHandle={userHandle}
                                    openDialog={this.props.openDialog}/>
                        </div>            
                    </div>
                )          
        } else if (type === "link") {
             return (
                    <div className="post-body">
                        <div className="pic-wrapper">
                                <img className="user-pic" src={userImage} alt="user profile"/>
                        </div>
                    
                        <div className="post-card" >
                            <Link to={`/users/${userHandle}`} className="user-id">{userHandle}</Link>
                            {deleteButton} 
                            <p className="post-time">{dayjs(createdAt).fromNow()}</p>

                             {(linkUrl === "") ?
                            null : <ReactTinyLink
                                        cardSize="large"
                                        showGraphic={true}
                                        maxLine={2}
                                        minLine={1}
                                        url = {linkUrl}
                                         />}
                        
                            <div className='body-content'>
                                <span className="card-content"><pre style={{fontFamily:"Helvetica Neue,HelveticaNeue,Helvetica,Arial,sans-serif"}}>{body}</pre></span>
                                <span className="card-hashtag">{hash}</span>  
                            </div>
                                <LikeButton screamId={screamId} />
                                <span>{likeCount} Likes</span>
                                <MyButton tip="comments">
                                    <ChatIcon color="primary" />
                                </MyButton>
                                <span>{commentCount} comments</span>
                                <PostDailog
                                    screamId={screamId}
                                    userHandle={userHandle}
                                    openDialog={this.props.openDialog}/>
                        </div>            
                    </div>
             )      

        } else if(type === 'quote'){
            return (
                <div className="post-body">
                    <div className="pic-wrapper">
                        <img className="user-pic" src={userImage} alt="user profile"/>
                    </div>
                    
                    <div className="post-card" >
                        <Link to={`/users/${userHandle}`} className="user-id">{userHandle}</Link>
                        {deleteButton} 
                        <p className="post-time">{dayjs(createdAt).fromNow()}</p>
                        

                        <div className='quoteHere'>
                            <span className="quote-body">“{body}”</span>
                               {(title === "") ?
                             null : <p className="quote-from">── {title}</p>}
                        </div>
                      

                        {/* <p className="quote-from">── {title}</p> */}
                        {/* <img className="mainImage" src={pictureUrl} alt=""/> */}
                        <div>
                        
                        <span className="card-hashtag">{hash}</span>  
                        </div>

                            <LikeButton screamId={screamId} />
                            <span>{likeCount} Likes</span>
                            <MyButton tip="comments">
                                <ChatIcon color="primary" />
                            </MyButton>
                            <span>{commentCount} comments</span>
                            <PostDailog
                                screamId={screamId}
                                userHandle={userHandle}
                                openDialog={this.props.openDialog}/>
                    </div>            
                </div>
            )      
        } 
        
        else if (type === 'gif') {
            return (
            <div className="post-body">
                <div className="pic-wrapper">
                        <img className="user-pic" src={userImage} alt="user profile"/>
                </div>
                
                <div className="post-card" >
                    <Link to={`/users/${userHandle}`} className="user-id">{userHandle}</Link>
                    {deleteButton} 
                    <p className="post-time">{dayjs(createdAt).fromNow()}</p>

                    {(title === "") ?
                            null : <p className="card-title">{title}</p>}
                    
                    <img className="mainImage" src={pictureUrl} alt=""/>
                    <div>
                      <p className="card-content">{body}</p>
                      <span className="card-hashtag">{hash}</span>  
                    </div>

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