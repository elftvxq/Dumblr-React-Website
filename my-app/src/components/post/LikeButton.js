import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

const styles = {
    likeIcon: {
        color: '#DB5461'
    }
}

export class LikeButton extends Component {

    likedScream = () => {
            if (
            this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.screamId === this.props.screamId
            )
            )
            return true;
            else return false;
        };

     likeScream = () => {
         this.props.likeScream(this.props.screamId);
     };
     unlikeScream = () => {
         this.props.unlikeScream(this.props.screamId);
     };
    

    render() {
        const { classes } = this.props;
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to ='/signin'>
                <MyButton tip="Like">
                    <FavoriteBorder color="primary" />
                </MyButton> 
            </Link>
            ):(
            this.likedScream() ? (
                <MyButton tip="Undo Like" onClick={this.unlikeScream}>
                    <FavoriteIcon className={classes.likeIcon} />
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeScream}>
                    <FavoriteBorder color="primary" />
                </MyButton>
            ) 
            );

        return likeButton;
    }
}

//user

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unlikeScream
};

export default connect( mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton)) ;
