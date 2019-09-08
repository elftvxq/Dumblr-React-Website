import React, { Component } from "react";
import "./signIn.css";
import { NavLink } from "react-router-dom";
import { Redirect } from 'react-router-dom';

class SignIn extends Component{

    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render(){

        const { authError, auth } = this.props;
        if(auth.uid) return <Redirect to="/dashboard"/>

        return(
            <div>
                <div className="signup-nav">
                    <NavLink to ="/signup"><button className="signup-btn">註冊</button></NavLink>
                </div>

                <div className="singin-section">
                   
                    <form className="signin-form" onSubmit={this.handleSubmit}>     
                        <span className="signin-title">Dumblr</span>
                         <input type="email" id="email" placeholder="電子郵件" className="signin-mail" onChange={this.handleChange}/>
                         <input type="password" id="password" placeholder="密碼" onChange={this.handleChange}/>
                         <button className="signin-btn">登入</button>
                         <div>
                         {authError? <p className="signin-message">{ authError }</p> : null }
                         </div>
                    </form>
                   
                </div>

            </div>
        )
    }
}

export default SignIn;