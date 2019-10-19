import React, { Component } from "react";
import './createGif.css';
import PropTypes from 'prop-types';
import { postScream } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';
import GifPicker from 'gifpicker';
import 'gifpicker/dist/style.css';



class CreateGif extends Component {
    
    state = {
       type: 'gif', 
       title: '',
       body: '',
       linkUrl: '' ,
       tags: [],
       picture: null,
       pictureUrl: null,
       errors: {},
    };


    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
            errors: nextProps.UI.errors
        });
       };
       if(!nextProps.UI.errors && !nextProps.UI.loading){
           this.setState({ body: '',title:'', pictureUrl:'', erros:{} });
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

    passUrl = (gifUrl) => {
        this.setState({
            pictureUrl: gifUrl
        }) 
        console.log(this.state.pictureUrl);
    }

    gifChange=(e)=>{        
        this.setState({
            [e.target.id]: e.target.value
        }, )
        console.log(this.state)
       
    }

    gifSubmit=(e)=>{
        e.preventDefault();
        this.props.postScream(this.state);
        this.props.isClose();
    }
   
 
    


    render(){
        const { tags } = this.state;
        const { user: { credentials: { handle } }} = this.props;
       
    
    return(     
        <div className="wrap">
            <div className="bg"></div>
            
            <div className="gif-card">
            <form onSubmit={this.gifSubmit}>
                <p className="post-id">{handle}</p>

                <div className="gif-section">
                    <input className="gif-title" id="title" type="title" placeholder='標題' onChange={this.gifChange} autoComplete="off"/>
                </div>
               
                <textarea className="gif-content" id="body" cols="15" rows="5" placeholder="有什麼話想說？" onChange={this.gifChange}></textarea>
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

                <div className="gif-btns">
                    <span className="close-btn" onClick={()=>{this.props.isClose()}}>關閉</span>
                    <span type="submit" className="send-btn" onClick={this.gifSubmit}>貼文</span> 
                </div>
    
            </form>
                 <GifPicker apikey="HB062X5OE101" onSelect={(gifUrl) => {this.passUrl(gifUrl); console.log(gifUrl)}}/> 
                
            </div>
           
        </div>
        )
    }
}


CreateGif.propType = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
})


export default connect(mapStateToProps, { postScream })(CreateGif);
