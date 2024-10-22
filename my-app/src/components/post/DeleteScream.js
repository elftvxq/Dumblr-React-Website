import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
//MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteScream } from '../../redux/actions/dataActions';


const styles =(theme)=>({
    deleteButton: {
        position: 'absolute',
        left: '85%',
        top:'0%',
        '@media (max-width:414px)': {
            left: '85%',
        },
    },
    deleteIcon: {
        color: '#C9C9C9'
    }
});

class DeleteScream extends Component {

    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true }) }

    handleClose = () => {
        this.setState({ open: false }) }

    deleteScream = () =>{
        this.props.deleteScream(this.props.screamId)
        this.setState({ open: false })
    }    

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <MyButton tip='Delete the post' onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color='primary' className={classes.deleteIcon}/>
                </MyButton>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                        <DialogTitle> Are you sure you want to delete this post?</DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color='primary'> Cancel </Button>
                            <Button onClick={this.deleteScream} color='secondary'> Delete </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propsTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
};


export default connect( null, {deleteScream})(withStyles(styles)(DeleteScream));
