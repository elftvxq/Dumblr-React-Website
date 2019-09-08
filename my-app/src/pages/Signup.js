import React,{ Component } from "react";
import "./signUp.css";
import { NavLink } from "react-router-dom";
import { Redirect } from 'react-router-dom';

class Signup extends Component{
    state = {
    email: '',
    password: '',
    username: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }

  render() {

    const { auth, authError } = this.props;
        if(auth.uid) return <Redirect to="/dashboard"/>

    return (
        <div>
            <div className="signin-nav">
                <NavLink to ="/signin"><button className="login-btn">登入</button></NavLink>
            </div>

            <div className="singin-section">
                
                <form className="signin-form" onSubmit={this.handleSubmit}>     
                    <span className="signin-title">Dumblr</span>
                      <input type="email" id="email" placeholder="電子郵件" className="signin-mail" onChange={this.handleChange}/>
                      <input type="password" id="password" placeholder="密碼" onChange={this.handleChange}/>
                      <input type="text" id="username" placeholder="使用者名稱" onChange={this.handleChange}/>
                      <button className="register-btn">註冊</button>
                       {authError? <p className="signup-message">{ authError }</p> : null }
                </form>
                
            </div>

        </div>
    )
  }
};


export default Signup;