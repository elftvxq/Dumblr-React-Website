import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//MUI Staff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//Redux staff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';
import { CLEAR_ERRORS } from "../../redux/types";
 

const styles= (theme) => ({

});

class CommentForm extends Component {
    
    state = {
        body: '',
        errors
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.submitComment(this.props.screamId, { bodt: this.state.body });
    }

    render() {

        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFromMarkup = authenticated ? (
            <Grid item sm={12} style={ { textAlign: 'center'} }>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        name='body'
                        type='text'
                        lable='Comment on psot'
                        error={errors.comment ? true : false}
                        helperText= {errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                        />
                        <Button type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.button}>
                            Submit
                        </Button>
                </form>
                <hr className={classes.visibleSeperator}/>
            </Grid>
        ) : null;   

        return commentFromMarkup;
    }
}


CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
