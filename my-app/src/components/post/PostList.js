import React, { Component } from "react";
import "./postList.css";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import DeleteScream from "./DeleteScream";
import PostDailog from './PostDialog';
import LikeButton from './LikeButton';
import ReactPlayer from 'react-player';
//Redux
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactTinyLink } from 'react-tiny-link';
import Linkify from 'react-linkify';



class Posts extends Component {

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
        
        let videoContent;
        const linkUrlstr = `${linkUrl}`
        if (linkUrlstr.match('facebook') != null) {
            videoContent=   <ReactPlayer 
                                    url={linkUrl}
                                    playing={false}
                                    volume={0.8}
                                    width="100%"
                                    height="100%"
                                    className='react-player'   
                                    controls={true}
                                />
        } else {
            videoContent=   <ReactPlayer 
                                    url={linkUrl}
                                    playing={false}
                                    volume={0.8}
                                    width="100%"
                                    className='react-player'   
                                    controls={true}
                                />
        }

                
        const componentDecorator = (href, text, key) => (
            <a href={href} key={key} target="_blank" rel="noopener noreferrer">
                {text}
            </a>
            );

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
                                <Linkify componentDecorator={componentDecorator}><span className="card-content">{body}</span></Linkify>
                                <span className="card-hashtag">{hash}</span>  
                            </div>

                             <div className="postAction">
                                <div className="likeHeart">
                                    <LikeButton screamId={screamId}/></div>
                                   
                                        <p className='likecount'>{likeCount} Likes</p>
                                        <p className='commentcount'>{commentCount} Comments</p>
                                   
                                        
                                        <PostDailog
                                            screamId={screamId}
                                            userHandle={userHandle}
                                            openDialog={this.props.openDialog}/>
                                 </div>
                                
                                
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

                                <div className="linkImage">
                                    <ReactTinyLink
                                        cardSize="large"
                                        showGraphic={true}
                                        maxLine={2}
                                        minLine={1}
                                        url = {linkUrl}
                                        />
                                 </div> 
                        
                            <div className='body-content'>
                                 <Linkify componentDecorator={componentDecorator}><span className="card-content">{body}</span></Linkify>
                                <span className="card-hashtag">{hash}</span>  
                            </div>
                                <div className="postAction">
                                 <div className="likeHeart">
                                    <LikeButton screamId={screamId}/></div>
                                   
                                        <p className='likecount'>{likeCount} Likes</p>
                                        <p className='commentcount'>{commentCount} Comments</p>
                            
                                        <PostDailog
                                            screamId={screamId}
                                            userHandle={userHandle}
                                            openDialog={this.props.openDialog}/>
                                 </div>
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
                      
                        <div className='body-content'>
                            <span className="card-hashtag">{hash}</span>  
                        </div>

                            <div className="postAction">
                                <div className="likeHeart">
                                    <LikeButton screamId={screamId}/></div>
                                   
                                        <p className='likecount'>{likeCount} Likes</p>
                                        <p className='commentcount'>{commentCount} Comments</p>
                            
                                        <PostDailog
                                            screamId={screamId}
                                            userHandle={userHandle}
                                            openDialog={this.props.openDialog}/>
                                 </div>
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
                    <div className='body-content'>
                      <Linkify componentDecorator={componentDecorator}><span className="card-content">{body}</span></Linkify>
                      <span className="card-hashtag">{hash}</span>  
                    </div>

                        <div className="postAction">
                                <div className="likeHeart">
                                    <LikeButton screamId={screamId}/></div>
                                   
                                        <p className='likecount'>{likeCount} Likes</p>
                                        <p className='commentcount'>{commentCount} Comments</p>
                            
                                        <PostDailog
                                            screamId={screamId}
                                            userHandle={userHandle}
                                            openDialog={this.props.openDialog}/>
                                 </div>
                    </div>            
                </div>
            )      
        }

        else if (type === "video") {
             return (
                    <div className="post-body">
                        <div className="pic-wrapper">
                                <img className="user-pic" src={userImage} alt="user profile"/>
                        </div>
                    
                        <div className="post-card" >
                            <Link to={`/users/${userHandle}`} className="user-id">{userHandle}</Link>
                            {deleteButton} 
                            <p className="post-time">{dayjs(createdAt).fromNow()}</p>

                            <div className="player-wrapper">
                                {videoContent}
                            </div> 
                        
                            <div className='body-content'>
                                 <Linkify componentDecorator={componentDecorator}><span className="card-content">{body}</span></Linkify>
                                <span className="card-hashtag">{hash}</span>  
                            </div>
                                <div className="postAction">
                                 <div className="likeHeart">
                                    <LikeButton screamId={screamId}/></div>
                                   
                                        <p className='likecount'>{likeCount} Likes</p>
                                        <p className='commentcount'>{commentCount} Comments</p>
                            
                                        <PostDailog
                                            screamId={screamId}
                                            userHandle={userHandle}
                                            openDialog={this.props.openDialog}/>
                                 </div>
                        </div>            
                    </div>
             )    

        }
    }
}

Posts.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.user  
})


export default connect(mapStateToProps)(Posts);