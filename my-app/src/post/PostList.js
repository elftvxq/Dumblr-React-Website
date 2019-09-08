import React, { Component } from "react";
import "./postList.css";
import user from '../image/picture.png';
import { ReactComponent as Comment } from "../image/chat.svg";
import { ReactComponent as Retweet } from "../image/retweet.svg";
import { ReactComponent as Heart } from "../image/heart.svg";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Reply from './Reply';
import { Link } from "react-router-dom";

class PostList extends Component {
    
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
        const { screams } = this.props;
        dayjs.extend(relativeTime);

        return(
            <div className="post-list section">
            { screams && screams.map(scream => {

                {/* let hash = "";
                    scream.tags.forEach(tag => {
                      hash += tag + " ";  
                }) */}
                
                if (scream) {

                   let reply;
                   if (this.state.displayReply && this.state.key == scream.screamId) {
                       reply = <div> <Reply key={scream.screamId}/> <div className="mask" onClick={this.hideReply}></div></div> ;
                   } else {
                       reply = null;
                   }
                                        

                  return (
                    <div className="post-body" key={scream.screamId}>
                        <img className="user-pic" src={scream.userImage}  alt=""/>
                        <div className="post-card">
                              <Link to={`/users/${scream.userHandle}`} className="user-id">{scream.userHandle}</Link> 
                            {/* <p className="post-time">{moment(scream.createdAt.toDate().toString()).calendar()}</p> */}
                            <p className="post-time">{dayjs(scream.createdAt).fromNow()}</p>
                            <p className="card-title">{scream.title}</p>
                            <img className="mainImage" src={scream.pictureUrl} alt=""/>
                            <p className="card-content">{scream.body}</p>

                            {/* <p className="card-hashtag">{hash}</p> */}
                            <div className="post-details">
                                <p>{`${scream.commentCount}則迴響`}</p>
                                <div className="interact-icons">
                                    <Comment className="interact-icon" onClick={()=>{this.showReply(scream.screamId)}}/>
                                    
                                    <div className="reply-box" >
                                        {/* { (this.state.displayReply && this.state.key==post.id) ? (<Reply key={post.id}/><div className="mask" onClick={this.hideReply}></div>):(null) } */}
                                        {reply}
                                    </div>

                                    <Retweet className="interact-icon"/>
                                    <Heart className="interact-icon"/>
                                </div>

                            </div>
                        </div>            
                    </div>
                )  
                } else {
                    return (
                        <div className="container">
                            <p className="loading">Loading Post...</p>
                        </div>
                    )
                }
                
            })}
            </div>  
        )


    }
        
}

export default PostList;