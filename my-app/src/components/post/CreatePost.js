import React, { Component } from 'react';
import text from "../../image/text.png";
import quote from "../../image/left-quote.png";
import link from '../../image/link.png';
import gif from '../../image/gif.png';
import './createPost.css';
import CreateText from "./CreateText";
import CreateLink from './CreateLink';
import CreateQuote from './CreateQuote';
import CreateGif from './CreateGif';
import PropTypes from 'prop-types';
//Redux
import { clearErrors } from '../../redux/actions/dataActions';
import { connect } from "react-redux";


class CreatePost extends Component {

        state = {
        showText: false,
        showLink: false,
        showQuote: false,
        showGif: false
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

        return(
            <div className="post-bar">
                 <img className="avatar-Pic" src={imageUrl} alt=""/>
                 <div className="post-section">
                    <div className="post-text" onClick={this.hadleOpenText}><img src={text} alt="Post text"/><p className="icon-text" >文字</p></div>
                    <div className="post-pic" onClick={this.handleOpenLink}><img src={link} alt=""/><p className="icon-text">連結</p></div>
                    <div className="post-quote" onClick={this.handleOpenQuote}><img src={quote} alt=""/><p className="icon-text">引述</p></div>
                    <div className="post-video" onClick={this.handleOpenGif}><img src={gif} alt=""/><p className="icon-text">GIF</p></div>
                 </div>

                 {Dialog}
                 {Link}
                 {Quote}
                 {Gif}
                
             
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