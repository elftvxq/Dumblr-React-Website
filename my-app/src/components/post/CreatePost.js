import React, { Component } from 'react';
import text from "../../image/text.png";
import photo from "../../image/photo-camera.png";
import quote from "../../image/left-quote.png";
import video from "../../image/video-camera.png";
import link from '../../image/link.png';
import './createPost.css';
import CreateText from "./CreateText";
import CreateLink from './CreateLink';
import PropTypes from 'prop-types';
//Redux
import { clearErrors } from '../../redux/actions/dataActions';
import { connect } from "react-redux";


class CreatePost extends Component {

        state = {
        showText: false,
        showLink: false 
        }

    hadleOpenText =() => {
        // console.log('有點到')
        this.setState({
            showText: true
        });
    };

     handleCloseText=()=> {
         this.props.clearErrors();
         this.setState({
             showText: false
         });
     };

     handleOpenLink = () =>{
        this.setState({
            showLink: true
        });
     };

     handleCloseLink = () => {
          this.props.clearErrors();
          this.setState({
              showLink: false
          });
     };

     

    render(){

        const { user: { credentials:{ imageUrl }} } = this.props;

        let dialog;
        if(this.state.showText){
            dialog=<CreateText isClose={this.handleCloseText}/>;
        }

        let Link;
        if (this.state.showLink) {
            dialog=<CreateLink isClose={this.handleCloseLink}/>;
        }

        return(
            <div className="post-bar">
                 <img className="avatar-Pic" src={imageUrl} alt=""/>
                 <div className="post-section">
                    <div className="post-text" onClick={this.hadleOpenText}><img src={text} alt="Post text"/><p className="icon-text" >文字</p></div>
                    <div className="post-pic" onClick={this.handleOpenLink}><img src={link} alt=""/><p className="icon-text">連結</p></div>
                    <div className="post-quote"><img src={quote} alt=""/><p className="icon-text">引述</p></div>
                    <div className="post-video"><img src={video} alt=""/><p className="icon-text">影片</p></div>
                 </div>



                 {dialog}
                 {Link}
                
             
            </div>
        )
    }
}


CreatePost.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect( mapStateToProps , { clearErrors } )(CreatePost);