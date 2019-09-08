import React, { Component } from "react";
import "./postList.css";
import user from '../image/picture.png';
import { ReactComponent as Comment } from "../image/chat.svg";
import { ReactComponent as Retweet } from "../image/retweet.svg";
import { ReactComponent as Heart } from "../image/heart.svg";
import moment from 'moment';
import Reply from './Reply';

class PostList extends Component {
    
    state = {
        displayReply: false,
        key: ""
    };

    showReply=(id)=>{
        // console.log(id);
        
        this.setState({
            displayReply:true, key:id }, ()=>{
                console.log('監聽隱藏');
            // document.addEventListener('click', this.hideReply);    
        });
    }

    hideReply=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            displayReply: false}, ()=>{
                console.log('點到隱藏');
                // document.removeEventListener('click', this.hideReply);
            });
    }




    render(){
        const { posts } = this.props;


        return(
            <div className="post-list section">
            { posts && posts.map(post => {

                {/* let hash = "";
                    post.tags.forEach( tag => {
                      hash += tag + " ";  
                })
                 */}
                if (post) {

                   let reply;
                   if (this.state.displayReply && this.state.key == post.id) {
                       reply = <div> <Reply key={post.id}/> <div className="mask" onClick={this.hideReply}></div></div> ;
                   } else {
                       reply = null;
                   }
                                        

                  return (
                    <div className="post-body" key={post.id}>
                        <img className="user-pic" src={user} alt=""/>
                        <div className="post-card">
                            <p className="user-id">{post.userName}</p>
                            <p className="post-time">{moment(post.createdAt.toDate().toString()).calendar()}</p>
                            <p className="card-title">{post.title}</p>
                            <img className="mainImage" src={post.pictureUrl} alt=""/>
                            <p className="card-content">{post.content}</p>

                            {/* <p className="card-hashtag">{hash}</p> */}
                            <div className="post-details">
                                <p>105則迴響</p>
                                <div className="interact-icons">
                                    <Comment className="interact-icon" onClick={()=>{this.showReply(post.id)}}/>
                                    
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