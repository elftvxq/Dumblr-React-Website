import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//Icon
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
});

class Profile extends Component {

     handleImageChange =(e) =>{
        const image = e.target.files[0];
     }

     handleEditPicture = () =>{
         const fileInput = document.getElementById('imageInput');
         fileInput.click();
     }

    render(){
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated }} = this.props;
        
        let profileMarkup = !loading ? (authenticated ? (
          <Paper className={classes.paper}>
              <div className={classes.profile}>
                  <div className="image-wrapper">
                      <img src={imageUrl} alt="profile" className="profile-image"/>
                      <input type="file" name="" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                      <IconButton onClick={this.handleEditPicture} className="button">
                        <EditIcon color="primary"/>
                      </IconButton>
                  </div>
                  <hr/>
                  <div className="profile-details">
                      <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                          @{handle}
                      </MuiLink>
                      <hr/>
                      {bio && <Typography variant="body2">{bio}</Typography>}
                      <hr/>
                      {location && (
                          <Fragment>
                              <LocationOn color="primary"/> <span>{location}</span>
                              <hr/>
                          </Fragment>
                      )}
                      {website && (
                          <Fragment>
                            <LinkIcon color="primary"/> <a href={website} target='_blank' rel='noopener noreferrer'>
                                {` `}{website}
                            </a>
                            <hr/>
                          </Fragment>
                      )}
                        <CalendarToday color='primary'/> {` `}
                        <span>Joined {dayjs(createdAt).format('MM YYYY')}</span>
                  </div>
              </div>
          </Paper>  
        ):(
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>
                    No profile found, please login again.</Typography>
                    <div className={classes.buttons}>
                        <Button variant='contained' color='primary' component={Link} to='/signin'>
                            Login
                        </Button>
                        <Button variant='contained' color='secondary' component={Link} to='/signup'>
                            Signup
                        </Button>
                    </div>
               
            </Paper>
        )) :( <p>Loading...</p> )
        
        return profileMarkup;
           
    }
};

const mapStateToProps = (state) => ({
    user: state.user,
});

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Profile));