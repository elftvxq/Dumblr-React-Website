import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
//MUI
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import { Button } from "@material-ui/core";


const styles = {
    button: {
        float: 'right'
    },
    textField: {
        marginBottom: 20
    }
};

export class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

     mapUserDetailsToState = (credentials) => {
         this.setState({
             bio: credentials.bio ? credentials.bio : '',
             website: credentials.website ? credentials.website : '',
             location: credentials.location ? credentials.location : '',
         });
     };
    handleOpen = () => {
            this.setState({ open: true })
            this.mapUserDetailsToState(this.props.credentials);
        };

    handleClose = () => {
        this.setState({ open: false });
    }

    componentDidMount(){
        const { credentials } = this.props;
         this.mapUserDetailsToState(credentials);
    }

   

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSumbit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };


    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary"/>
                    </IconButton>
                </Tooltip>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth='sm'>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="A short bio about yourself"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth/>
                            <TextField
                                name="website"
                                type="text"
                                label = "website"
                                placeholder="Personal website"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                mt={5}
                                fullWidth/>
                            <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Where you live?"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                mt={5}
                                fullWidth/>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSumbit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state,) =>({
    credentials: state.user.credentials
});

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
