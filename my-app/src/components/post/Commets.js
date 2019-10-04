import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = (theme) => ({
    commentImage: {
        maxWith: '100%',
        height: '80px',
        width:'80px',
        objectFit: 'cover',
        borderRadius: '4%',
        marginLeft: '30px'
    },
    commentData: {
        marginLeft: 20,
        marginBottom: 10
    },
    invisibleSeperator:{
        border: 'none',
        marginBottom: '10px'
    }, 
    visibleSeperator:{
         width: '100%',
        //  borderBottom: '1px solid rbga(0, 0, 0, 0.1)',
         border: 'none',
         marginBottom: 20
    },
    commentContent:{
        marginTop: 10
    }

});


class Comments extends Component {
    render(){
        const { comments, classes  } = this.props;

        
        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;

                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={10} className={classes.commentContent}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <img src={userImage} alt="comment" className={classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={8} xs={6}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant="h6"
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color="primary"
                                                style={ {textDecoration: 'none'}}
                                            >
                                                {userHandle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeperator}/>
                                            <Typography variant="body1">{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length -1 && (
                                <hr className={classes.visibleSeperator} />
                            )}
                        </Fragment>
                    )
                })}

            </Grid>
        )
    }

};

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}


export default withStyles(styles)(Comments);