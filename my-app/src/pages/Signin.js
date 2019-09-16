import React, { Component } from "react";
import withStyles from '@material-ui/core/styles/withStyles'
import "./signIn.css";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Logo from '../image/Dumblr.png';
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
        width: '150px',
        margin: '20px auto 20px auto'
    },
    textField: {
        margin: '10px auto 10px auto', 
        background: '#E3F2FD',
        // backgroundColor: '#fcfcfb',
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        position: 'relative',
        background: '#8AA29E'
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem'
    },
    progress:{
        position:'absolute'
    },
    pageTitle: {
        color: '#FFFFFF'
    },
    remind: {
        color: '#FAFAFA'
    }
};


class SignIn extends Component{

    state = {
        email: '',
        password: '',
        errors:{}
    }

    handleChange = (e) => {
        console.log(this.state);
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
                <img src={Logo} alt="Dumblr" className={classes.image} />
                <Typography variant="h4" className={classes.pageTitle}>
                    Login
                </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
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
                            variant="outlined"
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
                             Don 't have an account? Sign up <Link to="/signup" className={classes.remind}>  here</Link>
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