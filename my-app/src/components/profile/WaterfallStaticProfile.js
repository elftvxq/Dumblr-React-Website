import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
//MUI
import MuiLink from '@material-ui/core/Link';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import './WaterfallStaticProfile.css';

const styles = (theme) => ({
    paper: {
        padding: 20,
        backgroundAttachment: 'fixed',
        backgroundRepeat:'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginBottom:'20px',
        height: '500px'
    },
    profile: {
        color: 'white',
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
            width: 150,
            height: 150,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
            border: '3px solid #B3CDD1',
            boxShadow:'0 5px 10px 0 rgba(0, 0, 0, .1)'
        },
        '& .profile-details': {
            textAlign: 'center',
            position: 'relative',
            fontSize: '14px',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            },
            
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
    },
    editicon: {
        top: '465 px',
        float: 'right',
        position: 'absolute',
        right: '90 px'
    },
    handleName:{
        color: '#ffffff'
    },
    
});

const WaterfallStaticProfile = (props) => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location, coverimageUrl }
  } = props;

  return (
    <div className={classes.paper} style={{backgroundImage: `url(${coverimageUrl})`}}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className="profile-background" style={{color:'#000000'}}>
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
            className={classes.handleName}
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <span variant="body2" className='waterfall-bio'> <pre>{bio}</pre></span>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {' '}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
        </div>
      </div>
    </div>
  );
};

WaterfallStaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WaterfallStaticProfile);