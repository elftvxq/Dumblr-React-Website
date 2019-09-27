import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import './profile.css';
// MUI
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
//Icon
import LocationOn from '@material-ui/icons/LocationOn';
import Public from '@material-ui/icons/Public';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from "@material-ui/icons/Edit";
import Camera from '@material-ui/icons/AddAPhoto';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//Redux
import { connect } from "react-redux";
import { uploadImage, logoutUser, uploadCoverImage } from "../../redux/actions/userActions";
import MyButton from '../../util/MyButton';


const styles = (theme) => ({
    spacing: value => value ** 2,
    paper: {
        // padding: 10,
        // width: '300px',
        width: '100%',
        borderRadius: '3px',
        
        '& .cover-wrapper': {
            position: 'relative',
        
        },
        '& .profile-cover': {
            width: '100%',
            position: 'relative',
            objectFit: 'cover',
        },
    },
    profile: {
        
        '& .image-wrapper': {
            bottom: '25px',
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 100,
            // height: 100,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '5%',
            // position: 'absolute',
            bottom: '-55px',
            // left: '38%',
            boxShadow: '0 5px 10px 0 rgba(0, 0, 0, .1)',
            margin: '0 auto',
            border: '3px solid #B3CDD1',
            backgroundColor: '#ffffff',
            boxShadow: '0 5px 15px 0px rgba(0, 0, 0, 0.6)',
            '@media (max-width:780px)': { 
                // left: '35%',
                width: 90,
                height: 90,
            },
             '@media (max-width:680px)': { 
                //  left: '35%',
                 width: 80,
                 height: 80,
             },
             '@media (max-width:576px)': { 
                //  left: '43%',
                 width: 120,
                 height: 120,
             },
             '@media (max-width:375px)': {
                //  left: '40%',
                  width: 110,
                  height: 110,
             },
        }, 
        '& .profile-details': {
            textAlign: 'center',
            position: 'relative',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '14px',
            marginTop: '20px',
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
    },
    editicon: {
        top: '465 px',
        float: 'right',
        position: 'absolute',
        right: '90 px'
    },
    bioContent: {
        fontSize: '0.875 rem',
        fontWeight: '400',
        lineHeight: '1.43',
        letterSpacing: '0.01071em',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
    loginButton: {
        backgroundColor: '#A44A3F',
         '&:hover': {
             background: "#F19C79",
         },
    },
    loginRemind:{
       paddingTop: '10px' 
    }
    
    
});

class Profile extends Component {
   

      handleImageChange = (event) => {
          const image = event.target.files[0];
          const formData = new FormData();
          formData.append('image', image, image.name);
          this.props.uploadImage(formData);
      };

     handleEditPicture = () =>{
         const fileInput = document.getElementById('imageInput');
         fileInput.click();
     }

      handleLogout = () => {
          this.props.logoutUser();
      };

     handleCoverImageChange = (event) => {
            const image = event.target.files[0];
            const formData = new FormData();
            formData.append('image', image, image.name);
            this.props.uploadCoverImage(formData);
        };

     handleEditCoverImage = () => {
            const fileInput = document.getElementById('coverimageInput');
            fileInput.click();
        }

    render(){
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location, coverimageUrl}, loading, authenticated  }} = this.props;


        let profileMarkup = !loading ? (authenticated ? (
          <Paper className={classes.paper}>

          <div className="cover-wrapper">
                    <div className="coverEdit">
                        <input type="file" id="coverimageInput" hidden="hidden" onChange={this.handleCoverImageChange}/>
                        <MyButton tip="Edit cover photo" onClick={this.handleEditCoverImage} btnClassName="button">
                            <EditIcon color="primary"/> 
                        </MyButton>
                    </div>
                    
               <img src={coverimageUrl} alt="" className="profile-cover"/>  
          </div>
           

              <div className={classes.profile}>
                  <div className="image-wrapper">
                      <img src={imageUrl} alt="profile" className="profile-image"/>
                      <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                      <MyButton tip="Edit profile picture" onClick={this.handleEditPicture} btnClassName="button">
                          <Camera color="primary"/> 
                      </MyButton>

                  </div>
                  <hr/>
                  <div className="profile-details">
                      <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                          @{handle}
                      </MuiLink>
                      <hr/>
                      {bio && <span variant="body2" className={classes.bioContent}><pre>{bio}</pre></span>}
                      <hr/>
                      {location && (
                          <Fragment>
                              <LocationOn color="primary"/> <span>{location}</span>
                              <hr/>
                          </Fragment>
                      )}
                      {website && (
                          <Fragment>
                            <Public color="primary"/> <a href={website} target='_blank' rel='noopener noreferrer'>
                                {` `}{website}
                            </a>
                            <hr/>
                          </Fragment>
                      )}
                        <CalendarToday color='primary'/> {` `}
                        <span>Joined {dayjs(createdAt).format('MM YYYY')}</span> 
                        </div>
                        <MyButton tip="Logout" onClick={this.handleLogout}>
                            <KeyboardReturn color="primary" />
                        </MyButton>
                        <EditDetails/>
              </div>
          </Paper>  
        ):(
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center' mt={4} className={classes.loginRemind}>
                    No profile found, please login again.</Typography>
                    <div className={classes.buttons}>
                        <Button variant='contained' className={classes.loginButton} color='primary' component={Link} to='/login'>
                            Login
                        </Button>
                        <Button variant='contained' color='secondary' component={Link} to='/signup'>
                            Signup
                        </Button>
                    </div>
               
            </Paper>
        )) :( <span className="loader"><span className="loader-inner"></span></span> )
        
        return profileMarkup;
           
    }
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    uploadImage,
    logoutUser,
    uploadCoverImage
};

Profile.propTypes = {
    uploadCoverImage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps )(withStyles(styles)(Profile));