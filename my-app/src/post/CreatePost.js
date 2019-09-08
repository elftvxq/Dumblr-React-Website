import React, { Component } from 'react';
import user from '../image/picture.png';
import text from "../image/text.png";
import photo from "../image/photo-camera.png";
import quote from "../image/left-quote.png";
import video from "../image/video-camera.png";
import './createPost.css';
import CreateText from "./CreateText";


class CreatePost extends Component {

        state = {
        showText: false   
        }

    hadleOpenText =() => {
        // console.log('有點到')
        this.setState({
            showText: true
        });
    }

     handleCloseText=()=> {
         this.setState({
             showText: false
         });
     }

    render(){
        let dialog;
        if(this.state.showText){
            dialog=<CreateText isClose={this.handleCloseText}/>;
        }

        return(
            <div className="post-bar">
                 <img className="avatar-Pic" src={user} alt=""/>
                 <div className="post-section">
                    <div className="post-text" onClick={this.hadleOpenText}><img src={text} alt=""/><p className="icon-text" >文字</p></div>
                    <div className="post-pic"><img src={photo} alt=""/><p className="icon-text">相片</p></div>
                    <div className="post-quote"><img src={quote} alt=""/><p className="icon-text">引述</p></div>
                    <div className="post-video"><img src={video} alt=""/><p className="icon-text">影片</p></div>
                 </div>



                 {dialog}
                
             
            </div>
        )
    }
}

export default CreatePost;