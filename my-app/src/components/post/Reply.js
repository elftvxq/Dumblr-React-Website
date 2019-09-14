import React, { Component } from "react";
import './reply.css';
import user from '../../image/picture.png';

class Reply extends Component {
    
    render(){
        return(
            <div className="reply-list">
                <div className="reply-header">
                <span className="reply-count">120則迴響</span></div> 

                    <ul>
                        <li className="reply-line">
                            <img src={user} className="reply-handle" alt=""/>
                            <div className="reply-content">
                                <span className="reply-user">Sponge Bob</span>
                                <p className="reply-text">this is nice!</p>
                            </div>        
                        </li>
                    </ul>
                <div className="reply-input">
                    <input type="text" className="say-something" placeholder="有話想說？"/>
                    <button className="reply-send">回覆</button>
                </div>
            </div>
        )
    }
}

export default Reply;