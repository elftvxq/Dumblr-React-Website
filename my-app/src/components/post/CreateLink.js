import React, { Component } from "react";
import './createLink.css';
import PropTypes from 'prop-types';
import { postScream } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';
import { linktool } from './Checklink';


class CreateLink extends Component {
    
    state = {
       type: 'link', 
       title: '',
       body: '',
       linkUrl: '' ,
       tags: [],
       picture: null,
       pictureUrl: null,
       errors: {},
       urlerror: null
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
            errors: nextProps.UI.errors
        });
       };
       if(!nextProps.UI.errors && !nextProps.UI.loading){
           this.setState({ body: '', erros:{} });
           this.props.isClose();
       }
            
    };
    
    removeTag = (i) =>{
        const newTags = [...this.state.tags];
        newTags.splice(i, 1);
        this.setState({tags: newTags});
    }

    inputKeyDown =(e) =>{
        e.stopPropagation();
        const inputValue = e.target.value;

        if (e.key === 'Enter' && inputValue) {
            if (this.state.tags.find(tag=> tag.toLowerCase() === inputValue.toLowerCase())) {
                return;
            }
            this.setState({
                tags: [...this.state.tags, inputValue]
            });
            this.tagInput.value = null;
          } else if(e.key === 'Backspace' && !inputValue) {
              this.removeTag(this.state.tags.length-1);
        }
        // console.log(this.state.tags)
    }

    linkChange=(e)=>{        
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state)
    }

    //表單驗證
    handleValidation = () => {
        let formIsValid = true;

        if (!this.state.linkUrl) {
            this.setState({
                urlerror: 'The link cannot be empty'
            });
            formIsValid = false;
        } else if (!linktool.isValidURL(this.state.linkUrl)) {
            this.setState({
                urlerror: 'This link is not valid'
            });
        } else return formIsValid;
    }


    //  isValidURL = (url) => {
    //      var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    //      if (RegExp.test(url)) {
    //          return true;
    //      } else {
    //          return false;
    //      }
    //  }
    
    linkSubmit=(e)=>{
         e.preventDefault();
         
        if(this.handleValidation()) {
             this.props.postScream(this.state); 
        } else {
          console.log(this.state.errors);
          return false;
        }
    };
   


    render(){
        const { tags } = this.state;
        const { user: { credentials: { handle } }} = this.props;
        
    
    return(     
        <div className="wrap">
            <div className="bg"></div>
            
            <div className="link-card">
            <form onSubmit={this.linkSubmit}>
                <p className="post-id">{handle}</p>

                <div className="link-section">
                    <input className="link-title" id="linkUrl" type="title" placeholder='輸入或貼上一個URL' onChange={this.linkChange} autoComplete="off"/>
                </div>
                <div className="error-content">
                  <span>{this.state.urlerror !== null && this.state.urlerror}</span>  
                </div>
                

                <textarea className="post-content" id="body" cols="15" rows="5" placeholder="加上敘述才可以" onChange={this.linkChange} autoComplete="off"></textarea>
                {/* Hashtag輸入 */}
              
                <div className="input-tag">
                    <ul className="input-tags">
                        { tags.map((tag, i)=>(
                            <li key={tag}>
                                {tag}
                                <button type="button" onClick={()=>{this.removeTag(i)}} style={{color:'white'}}>+</button>
                            </li>
                        )) }
                        <li className="keyin-tag" style={{border:'none', backgroundColor:'white'}}><input id="tags" type="text" placeholder="#標籤" onKeyDown={this.inputKeyDown} ref={c => {
                        this.tagInput = c; }} autoComplete="off"/></li>
                    </ul>    
                </div>

                <div className="post-btns">
                    <span className="close-btn" onClick={()=>{this.props.isClose()}}>關閉</span>
                    <span type="submit" className="send-btn" onClick={this.linkSubmit}>貼文</span> 
                </div>
    
            </form>
              
                
            </div>
           
        </div>
        )
    }
}


CreateLink.propType = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
})


export default connect(mapStateToProps, { postScream })(CreateLink);
