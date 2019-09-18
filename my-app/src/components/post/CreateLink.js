import React, { Component } from "react";
import './createLink.css';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { postScream } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';


const styles = {
  
};

class CreateText extends Component {
    
    state = {
       type: 'link', 
       title: '',
       body: '',
       linkUrl: '' ,
       tags: [],
       picture: null,
       pictureUrl: null,
       errors: {}
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
        console.log(this.state.tags)
    }

    linkChange=(e)=>{        
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state)
    }

    
    linkSubmit=(e)=>{
        e.preventDefault();
        this.props.postScream(this.state);
    }
   


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
                
                <textarea className="post-content" id="body" cols="15" rows="5" placeholder="加上敘述才可以" onChange={this.linkChange} autoComplete="off"></textarea>
                {/* Hashtag輸入 */}
              
                <div className="input-tag">
                    <ul className="input-tags">
                        { tags.map((tag, i)=>(
                            <li key={tag}>
                                {tag}
                                <button type="button" onClick={()=>{this.removeTag(i)}}>+</button>
                            </li>
                        )) }
                        <li className="keyin-tag"><input id="tags" type="text" placeholder="#標籤" onKeyDown={this.inputKeyDown} ref={c => {
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


CreateText.propType ={
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
})


export default connect(mapStateToProps, { postScream })(withStyles(styles)(CreateText));
