import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LocalPhone from '@material-ui/icons/LocalPhone';
import LocationOn from '@material-ui/icons/LocationOn';
import {
  Card, Typography, CardContent,
  ListItem, ListItemText, ListItemAvatar,
  Avatar, Divider
} from '@material-ui/core';
import styles from './cardStyle-jss';


class IdentityCard extends React.Component {
  render() {
    const {
      classes,
      title,
      name,
      avatar,
      phone,
      address,
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subtitle1">{title}</Typography>
          <Divider className={classes.divider} />
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt={name}
                src={avatar}
                className={classes.avatar}
              />
            </ListItemAvatar>
            <ListItemText primary="Name" secondary={name} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocalPhone />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Phone" secondary={phone} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationOn />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Address" secondary={address} />
          </ListItem>
        </CardContent>
      </Card>
    );
  }
}

IdentityCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default withStyles(styles)(IdentityCard);
