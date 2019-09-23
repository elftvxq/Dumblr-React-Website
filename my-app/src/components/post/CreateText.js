import React, { Component } from "react";
import { storage } from '../../config/fbConfig';
import './createText.css';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import uploadphoto from '../../image/photo-camera-grey.png';
import PreviewPicture from "./PreviewPicture";
import { postScream } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';
import { border } from "@material-ui/system";


const styles = {
    previewPic: {
        width: '100%'
    }
};

class CreateText extends Component {
    
    state = {
       type: 'text', 
       title:'',
       body:'',
       tags: [],
       picture: null,
       pictureUrl: null,
       linkUrl: null,
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

    handleChange=(e)=>{        
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state)
    }

    
    handleSubmit=(e)=>{
        e.preventDefault();
        // console.log("ssss")
        // console.log(this.state)
        if (this.state.picture == null) {
            this.props.postScream(this.state);
            this.props.isClose();
            return;
        } else {
            const { picture } = this.state;
            const createTime = `${new Date().getTime()}`
            const uploadTask = storage.ref(`images/${createTime + picture.name}`).put(picture);

            
            uploadTask.on('state_changed', 
            (snapshot)=>{
                // progress function
                // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100);
                // console.log(progress);
            }, (error)=>{
                // error function
            console.log(error)     
            }, () => {
               
                storage.ref('images').child(createTime + picture.name).getDownloadURL().then(url => {
                    console.log(url);
                   
                    console.log(this.state)
                    this.props.postScream({
                        ...this.state,
                        picture: "",
                        pictureUrl: url
                    })
                    this.props.isClose();
                })
            }); 
        } 
    }
   
    //預覽照片檔案
    displayPicture = (e) =>{
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ 
                picture: file,
                pictureUrl: reader.result
            }) 
            console.log(this.state.picture);
        }
        reader.readAsDataURL(file);
        console.log(this.state)
        
    }
 


    render(){
        const { tags } = this.state;
        const { classes, user: { credentials: { handle } }} = this.props;
    
    return(     
        <div className="wrap">
            <div className="bg"></div>
            
            <div className="text-section">
            <form onSubmit={this.handleSubmit}>
                  <p className="post-id">{handle}</p>
                
                <input className="post-title" id="title" type="title" placeholder="標題" onChange={this.handleChange} autoComplete="off"/>
                <PreviewPicture pictureUrl={this.state.pictureUrl} className={classes.previewPic}/>
                <div className="upload"><img title="上傳照片" src={uploadphoto} alt="" onClick={()=> this.fileInput.click()}/>
                    <input type="file" className="upload-image" onChange={(e)=> {this.displayPicture(e)}} multiple={false} accept="image/*" validate="required" ref={fileInput=> this.fileInput = fileInput} style={{display:'none'}}/>
                    <div className="preview-image">
                        { /* preview image */ }
                    </div>
                </div>

                <textarea className="post-content" id="body" cols="15" rows="5" placeholder="在這裡填寫文字" onChange={this.handleChange} autoComplete="off"></textarea>
                {/* Hashtag輸入 */}
              
                <div className="input-tag">
                    <ul className="input-tags">
                        { tags.map((tag, i)=>(
                            <li key={tag}>
                                {tag}
                                <button type="button" onClick={()=>{this.removeTag(i)}}>+</button>
                            </li>
                        )) }
                        <li className="keyin-tag" style={{border:'none', backgroundColor:'white'}}><input id="tags" type="text" placeholder="#標籤" onKeyDown={this.inputKeyDown} ref={c => {
                        this.tagInput = c; }} autoComplete="off"/></li>
                    </ul>    
                </div>

                <div className="post-btns">
                    <span className="close-btn" onClick={()=>{this.props.isClose()}}>關閉</span>
                    <span type="submit" className="send-btn" onClick={this.handleSubmit}>貼文</span> 
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
