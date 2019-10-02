import React, { Component } from 'react';
import PropTypes from 'prop-types';
import text from "../../image/text_512.png";
import quote from "../../image/quote_512.png";
import link from '../../image/link_512.png';
import gif from '../../image/gif_512.png';
import video from '../../image/play-button.png';
import './createPost.css';
import CreateText from "./CreateText";
import CreateLink from './CreateLink';
import CreateQuote from './CreateQuote';
import CreateGif from './CreateGif';
import CreateVideo from './CreateVideo';
//Redux
import { clearErrors } from '../../redux/actions/dataActions';
import { connect } from "react-redux";


class CreatePost extends Component {

        state = {
        showText: false,
        showLink: false,
        showQuote: false,
        showGif: false,
        showVideo: false
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

     handleOpenQuote = () => {
         this.setState({
             showQuote: true
         });
     };

     handleCloseQuote = () => {
         this.props.clearErrors();
         this.setState({
             showQuote: false
         });
     };

     handleOpenGif = () => {
         this.setState({
             showGif: true
         });
     };

     handleCloseGif = () => {
         this.props.clearErrors();
         this.setState({
             showGif: false
         });
     };

     handleOpenVideo = () => {
         this.setState({
             showVideo: true
         });
     };

     handleCloseVideo = () => {
         this.props.clearErrors();
         this.setState({
             showVideo: false
         });
     };

     

    render(){

        const { user: { credentials:{ imageUrl }} } = this.props;

        let Dialog;
        if(this.state.showText){
            Dialog=<CreateText isClose={this.handleCloseText}/>;
        }

        let Link;
        if (this.state.showLink) {
            Link=<CreateLink isClose={this.handleCloseLink}/>;
        }

        let Quote;
        if (this.state.showQuote) {
            Quote= <CreateQuote isClose={this.handleCloseQuote}/>
        }

        let Gif;
        if (this.state.showGif) {
            Gif= <CreateGif isClose={this.handleCloseGif}/>
        }

        let Video;
        if (this.state.showVideo) {
            Video= <CreateVideo isClose={this.handleCloseVideo}/>
        }

        return(
            <div className="post-bar">
                 <img className="avatar-Pic" src={imageUrl} alt=""/>
                 <div className="post-section">
                    <div className="post-text" onClick={this.hadleOpenText}><img src={text} alt="文字"/><p className="icon-text" >文字</p></div>
                    <div className="post-pic" onClick={this.handleOpenLink}><img src={link} alt="連結"/><p className="icon-text">連結</p></div>
                    <div className="post-quote" onClick={this.handleOpenQuote}><img src={quote} alt="引述"/><p className="icon-text">引述</p></div>
                    <div className="post-gif" onClick={this.handleOpenGif}><img src={gif} alt="GIF"/><p className="icon-text">GIF</p></div>
                    <div className="post-video" onClick={this.handleOpenVideo}><img src={video} alt="影片"/><p className="icon-text">影片</p></div>
                 </div>

                 {Dialog}
                 {Link}
                 {Quote}
                 {Gif}
                 {Video}
                
             
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