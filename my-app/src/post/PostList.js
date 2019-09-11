import React, { Component, Fragment } from "react";
import "./postList.css";
import { ReactComponent as Comment } from "../image/chat.svg";
import { ReactComponent as Retweet } from "../image/retweet.svg";
import { ReactComponent as Heart } from "../image/heart.svg";
import { ReactComponent as Liked } from "../image/like.svg";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Reply from './Reply';
//Redux
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from '../redux/actions/dataActions';
//MUI
import MyButton from '../util/MyButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


const styles = {

};

class Posts extends Component {

     likedScream = () => {
            if (
            this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.screamId === this.props.scream.screamId
            )
            )
            return true;
            else return false;
        };

     likeScream = () => {
         this.props.likeScream(this.props.scream.screamId);
     };
     unlikeScream = () => {
         this.props.unlikeScream(this.props.scream.screamId);
     };
    
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
        const { classes, user: { authenticated }, scream: { body, createdAt, userImage, userHandle, title, pictureUrl, screamId, likeCount, commentCount, tags} } = this.props;
        dayjs.extend(relativeTime);
        console.log(this.props);

        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to ='/signin'>
                    <FavoriteBorder color="primary" />
                </Link>
            </MyButton>
        ):(
          this.likedScream() ? (
              <MyButton tip="Undo Like" onClick={this.unlikeScream}>
                  <FavoriteIcon color="red" />
              </MyButton>
          ) : (
              <MyButton tip="Like" onClick={this.likeScream}>
                  <FavoriteBorder color="primary" />
              </MyButton>
          ) 
        );

        //Hashtag陣列
        let hash = "";
        tags.forEach(tag => {
            hash += tag + " ";  
                });
                
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
                
                <div className="post-card">
                    <Link to={`/users/${userHandle}`} className="user-id">{userHandle}</Link> 
                    <p className="post-time">{dayjs(createdAt).fromNow()}</p>
                    <p className="card-title">{title}</p>
                    <img className="mainImage" src={pictureUrl} alt=""/>
                    <p className="card-content">{body}</p>

                    <p className="card-hashtag">{hash}</p>
                    <div className="post-details">
                        <p>{`${commentCount}則迴響 ${likeCount}個喜歡`}</p>
                        <div className="interact-icons">
                            <Comment className="interact-icon" onClick={()=>{this.showReply(screamId)}}/>
                            
                            <div className="reply-box" >
                                {reply}
                            </div>

                            <Retweet className="interact-icon"/>
                            {likeButton }
                        </div>

                    </div>
                </div>            
            </div>
        )       
}
}

Posts.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user  
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Posts));