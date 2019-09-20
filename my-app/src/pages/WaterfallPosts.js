import React, { Component, Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './waterfallPosts.css';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import photo from '../../src/image/Dumblr2.jpg';
import { Link } from "react-router-dom";
import LikeButton from '../components/post/LikeButton';
import MyButton from '../util/MyButton';
import PostDailog from '../components/post/PostDialog';
import ChatIcon from '@material-ui/icons/Chat';
import { ReactTinyLink } from 'react-tiny-link';

const style = {
    margin: '10px',
    marginRight: '5px'
};



const masonryOptions = {
    transitionDuration: 2
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }


class WaterfallPosts extends Component {

   

  render() {
     const {
         user: {
             authenticated,
             credentials: {
                 handle
             }
         },
         screams
     } = this.props;

     dayjs.extend(relativeTime);
     console.log(this.props);
     
 
    const childElements = this.props.screams.map(scream => {

            //Hashtag陣列
            let hash = '';
                if (scream.tags && scream.tags.length > 0) {
                    scream.tags.forEach(item => {
                    hash += item + " ";  
                        });
                } else {
                    hash = "";
                };
            
            let postContent;
            if (scream.type === 'text'|| scream.type === 'link' || scream.type === 'gif') {
                 postContent = <p className="card-content">{scream.body}</p>
            } else if (scream.type === 'quote') {
                postContent = <p className="quote-body">“{scream.body}”</p>
            };
 
           return (
                 <Fragment key={scream.screamId}>
                        <div className="waterfall-card" >
                            <Link to={`/users/${scream.userHandle}`} className="user-id">{scream.userHandle}</Link>
                            <p className="post-time">{dayjs(scream.createdAt).fromNow()}</p>

                            
                            {(scream.title === "" && scream.type === 'text') ?
                            null : <p className="card-title">{scream.title}</p>}

                            {/* {(scream.title === "" && scream.type === 'quote') ?
                            null : <p className="quote-title">{scream.title}</p>} */}
                            
                            {(scream.pictureUrl === null) ?
                            null : <img className="mainImage" src={scream.pictureUrl} alt=""/>}
                            
                            {(scream.linkUrl === null || scream.linkUrl==="")?
                            null : <ReactTinyLink
                                        cardSize="large"
                                        showGraphic={true}
                                        maxLine={2}
                                        minLine={1}
                                        url = {scream.linkUrl}
                                         />}
                            
                            <div className='body-content'>
                                {/* <span className="card-content">{scream.body}</span> */}
                                {postContent}
                                <span className="card-hashtag">{hash}</span>  
                            </div>
                            <div className="actions">
                                <LikeButton screamId={scream.screamId} />
                                <span>{scream.likeCount}</span>
                                <MyButton tip="comments">
                                    <ChatIcon color="primary" />
                                </MyButton>
                                <span>{scream.commentCount}</span>
                                <PostDailog
                                    screamId={scream.screamId}
                                    userHandle={scream.userHandle}
                                    openDialog={this.props.openDialog}/>
                            </div>
                                
                        </div>            
                    </Fragment>
            );
        });
    
    return (
       <Masonry className={'my-gallery-class'} // default ''
                elementType={'div'} // default 'div'
                style={style}
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                imagesLoadedOptions={imagesLoadedOptions} // default {}>
                >
                  {childElements}
                  <div className="my-bg-image-el"></div>
          
       </Masonry>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps)(WaterfallPosts) ;
