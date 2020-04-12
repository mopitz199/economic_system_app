import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Type from 'ba-styles/Typography.scss';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Favorite from '@material-ui/icons/Favorite';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
} from '@material-ui/core';
import styles from './cardStyle-jss';


class ProfileCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const {
      classes,
      cover,
      avatar,
      name,
      title,
      connection,
      isVerified,
      btnText
    } = this.props;

    return (
      <Card className={classes.cardSocmed}>
        <CardMedia
          className={classes.mediaProfile}
          image={cover}
          title="cover"
        />
        <CardContent className={classes.contentProfile}>
          <Avatar alt="avatar" src={avatar} className={classes.avatarBig} />
          <Typography variant="h6" className={classes.name} gutterBottom>
            {name}
            {isVerified && <VerifiedUser className={classes.verified} />}
          </Typography>
          <Typography className={classes.subheading} gutterBottom>
            <span className={Type.regular}>{title}</span>
          </Typography>
          <Typography variant="caption" component="p">
            {connection}
            {' '}
connection
          </Typography>
          <Button className={classes.buttonProfile} size="large" variant="outlined" color="secondary">
            {btnText}
          </Button>
        </CardContent>
        <Divider />
        <CardActions>
          <BottomNavigation
            showLabels
            className={classes.bottomLink}
          >
            <BottomNavigationAction label="20 Connection" icon={<SupervisorAccount />} />
            <BottomNavigationAction label="10 Favorites" icon={<Favorite />} />
            <BottomNavigationAction label="5 Albums" icon={<PhotoLibrary />} />
          </BottomNavigation>
        </CardActions>
      </Card>
    );
  }
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  cover: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  connection: PropTypes.number.isRequired,
  btnText: PropTypes.string.isRequired,
  isVerified: PropTypes.bool
};

ProfileCard.defaultProps = {
  isVerified: false
};

export default withStyles(styles)(ProfileCard);
