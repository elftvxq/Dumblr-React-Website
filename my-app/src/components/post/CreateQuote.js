import React, { Component } from "react";
import './createQuote.css';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { postScream } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';


const styles = {
    quotefrom: {
        display: 'flex',
        position: 'relative'
    },
    quoteline: {
        border: '0',
        height: '2px',
        width: '15px',
        background: '#333',
        position: 'absolute',
        top: '10px'
    }
};

class CreateQuote extends Component {
    
    state = {
       type: 'quote', 
       title: '',
       body: '',
       linkUrl: null ,
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

    quoteChange=(e)=>{        
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state)
    }

    
    quoteSubmit=(e)=>{
        e.preventDefault();
        this.props.postScream(this.state);
    }
   


    render(){
        const { tags } = this.state;
        const { classes, user: { credentials: { handle } }} = this.props;
       
               
    
    return(     
        <div className="wrap">
            <div className="bg"></div>
            
            <div className="quote-card">
            <form onSubmit={this.quoteSubmit}>
                <p className="post-id">{handle}</p>

               
                <input className="quote-title" id="body" type="text" placeholder=' “引述” ' onChange={this.quoteChange} autoComplete="off"/>
                <div className={classes.quotefrom}>
                     <hr className={classes.quoteline}/>
                    <textarea className="quote-content" id="title" cols="15" rows="5" placeholder="來源" onChange={this.quoteChange}></textarea>
                </div>
                 
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
                    <span type="submit" className="quote-btn" onClick={this.quoteSubmit}>貼文</span> 
                </div>
    
            </form>
              
                
            </div>
           
        </div>
        )
    }
}


CreateQuote.propType = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
})


export default connect(mapStateToProps, { postScream })(withStyles(styles)(CreateQuote));