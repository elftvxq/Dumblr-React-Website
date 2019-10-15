import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './waterfallPosts.css';
import { connect } from 'react-redux';
// import Masonry from 'react-masonry-component';
import Masonry from 'react-masonry-css'
import { Link } from "react-router-dom";
import LikeButton from '../components/post/LikeButton';
import PostDailog from '../components/post/PostDialog';
import { ReactTinyLink } from 'react-tiny-link';
import Linkify from 'react-linkify';
import ReactPlayer from 'react-player';


const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    850: 2,
    700: 2,
    576: 1
};

class WaterfallPosts extends Component {

   

  render() {
     const { screams } = this.props;

     dayjs.extend(relativeTime);

     const componentDecorator = (href, text, key) => (
            <a href={href} key={key} target="_blank" rel="noopener noreferrer">
                {text}
            </a>
            );
     
 
     const childElements = screams.map(scream => {

            //Hashtag陣列
            let hash = '';
                if (scream.tags && scream.tags.length > 0) {
                    scream.tags.forEach(item => {
                    hash += item + " ";  
                        });
                } else {
                    hash = "";
                };
        
            

            let postTitle;
             if (scream.type === 'text' || scream.type === 'link' || scream.type === 'gif' || scream.type === 'video')
                if(scream.title !== null) {
                    postTitle = <p className="card-title">{scream.title}</p>
                } else if (scream.type === 'quote') {
                    postTitle = null
                }

            let postContent;
            if (scream.type === 'text'|| scream.type === 'link' || scream.type === 'gif' || scream.type === 'video') {
                 postContent = <Linkify componentDecorator={componentDecorator}><span className="card-content">{scream.body}</span></Linkify>
            } else if (scream.type === 'quote') {
                postContent = <div className='quoteHere'>
                                <span className="quote-body">“{scream.body}”</span>
                                {(scream.title === "") ?
                                null : <p className="quote-from">── {scream.title}</p>}
                            </div>
            };

            let linkContent;
            if (scream.type === 'link') {
                linkContent = <ReactTinyLink
                                cardSize="large"
                                showGraphic={true}
                                maxLine={2}
                                minLine={1}
                                url = {scream.linkUrl}
                                    />
                } else if (scream.type === 'video') {
                     const linkUrlstr = `${scream.linkUrl}`
                        if (linkUrlstr.match('facebook') != null) {
                            linkContent=<ReactPlayer 
                                            url={scream.linkUrl}
                                            playing={false}
                                            volume={0.8}
                                            width="100%"
                                            height="100%"
                                            className='react-player'   
                                            controls={true}
                                            />
                            } else {
                                linkContent=<ReactPlayer 
                                            url={scream.linkUrl}
                                            playing={false}
                                            volume={0.8}
                                            width="100%"
                                            className='react-player'   
                                            controls={true}
                                            />
                    }
                };
            
 
           return (
                 
                        <div className="waterfall-card" key={scream.screamId}>
                            <Link to={`/users/${scream.userHandle}`} className="user-id">{scream.userHandle}</Link>
                            <p className="post-time">{dayjs(scream.createdAt).fromNow()}</p>

                           {postTitle} 
                            {/* {(scream.title === "" && scream.type === 'text') ?
                            null : <p className="card-title">{scream.title}</p>} */}

                            {/* {(scream.title === "" && scream.type === 'quote') ?
                            null : <p className="quote-title">{scream.title}</p>} */}
                            
                            {(scream.pictureUrl === null) ?
                            null : <img className="mainImage" src={scream.pictureUrl} alt=""/>}
                            
                            {linkContent}
                            
                            
                            <div className='body-content'>
                                {/* <span className="card-content">{scream.body}</span> */}
                                {postContent}
                                <span className="card-hashtag">{hash}</span>  
                            </div>
                                <div className="postAction">
                                 <div className="likeHeart2">
                                    <LikeButton screamId={scream.screamId}/></div>
                                   
                                        <p className='likecount'>{scream.likeCount} Likes</p>
                                        <p className='commentcount'>{scream.commentCount} Comments</p>
                                        
                                            <PostDailog
                                            screamId={scream.screamId}
                                            userHandle={scream.userHandle}
                                            openDialog={this.props.openDialog}/>

                                 </div>
            
                                
                        </div>            
                   
            );
        });
    
    return (
       <Masonry breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                  {childElements}  
       </Masonry>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps)(WaterfallPosts) ;
