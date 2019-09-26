import React, { Component } from "react";
import withStyles from '@material-ui/core/styles/withStyles'
import "./signIn.css";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Logo from '../image/Dumblr2.jpg';
//MUI 
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = {
    form: {
        textAlign: 'center',
    },
    image:{
        width: '100%',
        // margin: '20px auto 20px auto'
    },
    textField: {
        margin: '10px auto 10px auto', 
        background: '#FFFFFF',
        borderRadius: 4
        // backgroundColor: '#fcfcfb',
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        position: 'relative',
        background: '#4A5899'
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem'
    },
    progress:{
        position:'absolute',
        color: '#4B4E6D'
    },
    pageTitle: {
        color: '#FFFFFF', 
    },
    remind: {
        color: '#F2F4F3'
    }
};


class SignIn extends Component{

    state = {
        email: '',
        password: '',
        errors:{}
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
           this.setState({ errors: nextProps.UI.errors }); 
        }  
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
    };

    render(){

        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        // if(auth.uid) return <Redirect to="/dashboard"/>

        return(
             <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                
                     <div className='profile-container'>
                    <div className="avatar">
                        <img src={Logo} alt="Dumblr" style={{borderRadius: '999em'}} className={classes.image} />
                    </div>
                </div>

                    <div className="text-animation">
                        <div className="content-container">
                            <p className="content-container-text">
                            Hello
                            </p>
                            <ul className="content-container-list">
                            <li className="content-container-list-item">world !</li>
                            <li className="content-container-list-item">dumblrs !</li>
                            <li className="content-container-list-item">users !</li>
                            <li className="content-container-list-item">everybody !</li>
                            </ul>
                             
                        </div>
                    </div>
 
            
                    <form noValidate onSubmit={this.handleSubmit} className="login-form">
                        <p className="pageTitle">Login</p> 
                        <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="filled"
                            value={this.state.email}
                            helperText={errors.email} error={errors.email ? true : false}
                            fullWidth
                        />
                        {/* <TextField className={classes.textField} type="email" id="email" name="email" lable="email" onChange={this.handleChange} placeholder="Email" value={this.state.email} variant="filled" helperText={errors.email} error={errors.email ? true : false} fullWidth/> */}
                        
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="filled"
                            value={this.state.password}
                            helperText={errors.password} error={errors.password ? true : false} 
                            fullWidth
                        />
                        {/* <TextField className={classes.textField} type="password" id="password" name="password" lable="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} helperText={errors.password} error={errors.password ? true: false} variant="filled" fullWidth/> */}
                        { errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                        Login
                        { loading && (
                            <CircularProgress size={25} className={classes.progress}/>
                        )}
                        </Button>
                         {/* <div>
                         {authError? <p className="signin-message">{ authError }</p> : null }
                         </div> */}
                         <br/>
                         <small className={classes.remind}>
                             Don 't have an account? <Link to="/signup" className="remind"> Sign up here</Link>
                         </small>
                         </form>
                    
               
                    </Grid>     
                    <Grid item sm/>
                </Grid>
        )
    }
}


SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SignIn));