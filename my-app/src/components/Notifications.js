import React from 'react';
import "./notifications.css";


const Notifications = () => {
    return(
        <div className="notice-menu">
            <ul>
                <div className="notice-header"><p>帳號</p><a className="logout" href="#">登出</a></div>
                <li className="notice-sub"><a href="#">追蹤</a><p className="menu-num">30</p></li>
                <li className="notice-sub"><a href="#">追蹤中</a><p className="menu-num">28</p></li>
                <li className="notice-sub"><a href="#Setting">你的帳號</a></li>
            </ul>
        </div>
    )
}

// const mapStateToProps = (state) => {
//     console.log(state)
//     return {
//         // posts: state.post.posts
//         auth: state.firebase.auth
//     }
// }

export default Notifications;