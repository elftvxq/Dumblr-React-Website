import React,{ Component } from "react";
import "./signUp.css";
import { Link } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles'
import Logo from '../image/Dumblr.png';
import PropTypes from 'prop-types';
//MUI 
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";


const styles = {
        form: {
            textAlign: 'center'
        },
        image: {
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
        customError: {
            color: 'red',
            fontSize: '0.8rem'
        },
        progress: {
            position: 'absolute'
        },
        pageTitle: {
            color: '#FFFFFF'
        },
        remind:{
            color: 'white'
        }
};

// const styles = (theme) => ({
//     ...theme.spreadIt
// })

class Signup extends Component{
    state = {
    email: '',
    password: '',
    confirmPassword:'',
    handle: '',
    errors:{}
  }

    handleChange = (e) => {
        this.setState({
        [e.target.id]: e.target.value
        })
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
           this.setState({ errors: nextProps.UI.errors }); 
        }  
    };

  
    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
    };

  render() {
    const { classes, UI:{ loading } } = this.props;
    const { errors } = this.state;

    return (
        <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                <img src={Logo} alt="Dumblr" className={classes.image} />
                <Typography variant="h4" className={classes.pageTitle}>
                    Signup
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
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            className={classes.textField}
                            type="password"
                            name="confirmPassword"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            value={this.state.confirmPassword}
                            helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} 
                            fullWidth
                        />

                        <TextField
                            id="handle"
                            label = "Handle"
                            className={classes.textField}
                            type="text"
                            name = "handle"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            value={this.state.handle}
                            helperText={errors.handle} error={errors.handle ? true : false} 
                            fullWidth
                        />
                        {/* <TextField className={classes.textField} type="password" id="password" name="password" lable="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} helperText={errors.password} error={errors.password ? true: false} variant="filled" fullWidth/> */}
                        { errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                        Signup
                        { loading && (
                            <CircularProgress size={25} className={classes.progress}/>
                        )}
                        </Button>
                         {/* <div>
                         {authError? <p className="signin-message">{ authError }</p> : null }
                         </div> */}
                         <br/>
                         <small className={classes.remind}>
                             Already have an account? Sign in <Link to="/login" className={classes.remind}>here</Link>
                         </small>
                         </form>
                    </Grid>
                    <Grid item sm/>
                </Grid>
    )
  }
};

Signup.propTypes ={
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
   user: state.user,
   UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup));