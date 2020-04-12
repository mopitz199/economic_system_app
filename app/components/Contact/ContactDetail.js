import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Edit from '@material-ui/icons/Edit';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocalPhone from '@material-ui/icons/LocalPhone';
import Email from '@material-ui/icons/Email';
import Smartphone from '@material-ui/icons/Smartphone';
import LocationOn from '@material-ui/icons/LocationOn';
import Work from '@material-ui/icons/Work';
import Language from '@material-ui/icons/Language';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
} from '@material-ui/core';
import styles from './contact-jss';


const optionsOpt = [
  'Block Contact',
  'Delete Contact',
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;

class ContactDetail extends React.Component {
  state = {
    anchorElOpt: null,
  };

  handleClickOpt = event => {
    this.setState({ anchorElOpt: event.currentTarget });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  deleteContact = (item) => {
    this.props.remove(item);
    this.setState({ anchorElOpt: null });
  }

  render() {
    const {
      classes,
      dataContact,
      itemSelected,
      edit,
      favorite,
      showMobileDetail
    } = this.props;
    const { anchorElOpt } = this.state;
    return (
      <main className={classNames(classes.content, showMobileDetail ? classes.detailPopup : '')}>
        <section className={classes.cover}>
          <div className={classes.opt}>
            <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => favorite(dataContact.get(itemSelected))}>
              {dataContact.getIn([itemSelected, 'favorited']) ? (<Star />) : <StarBorder />}
            </IconButton>
            <IconButton aria-label="Edit" onClick={() => edit(dataContact.get(itemSelected))}>
              <Edit />
            </IconButton>
            <IconButton
              aria-label="More"
              aria-owns={anchorElOpt ? 'long-menu' : null}
              aria-haspopup="true"
              className={classes.button}
              onClick={this.handleClickOpt}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorElOpt}
              open={Boolean(anchorElOpt)}
              onClose={this.handleCloseOpt}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              {optionsOpt.map(option => {
                if (option === 'Delete Contact') {
                  return (
                    <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteContact(dataContact.get(itemSelected))}>
                      {option}
                    </MenuItem>
                  );
                }
                return (
                  <MenuItem key={option} selected={option === 'Edit Profile'} onClick={this.handleCloseOpt}>
                    {option}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
          <Avatar alt={dataContact.getIn([itemSelected, 'name'])} src={dataContact.getIn([itemSelected, 'avatar'])} className={classes.avatar} />
          <Typography className={classes.userName} variant="h4">
            {dataContact.getIn([itemSelected, 'name'])}
            <Typography variant="caption" display="block">
              {dataContact.getIn([itemSelected, 'title'])}
            </Typography>
          </Typography>
        </section>
        <div>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.blueIcon}>
                  <LocalPhone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dataContact.getIn([itemSelected, 'phone'])} secondary="Phone" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.amberIcon}>
                  <Smartphone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dataContact.getIn([itemSelected, 'secondaryPhone'])} secondary="Secondary Phone" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.tealIcon}>
                  <Email />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dataContact.getIn([itemSelected, 'personalEmail'])} secondary="Personal Email" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.brownIcon}>
                  <Work />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dataContact.getIn([itemSelected, 'companyEmail'])} secondary="Company Email" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.redIcon}>
                  <LocationOn />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dataContact.getIn([itemSelected, 'address'])} secondary="Address" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.purpleIcon}>
                  <Language />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dataContact.getIn([itemSelected, 'website'])} secondary="Website" />
            </ListItem>
          </List>
        </div>
      </main>
    );
  }
}

ContactDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  showMobileDetail: PropTypes.bool.isRequired,
  dataContact: PropTypes.object.isRequired,
  itemSelected: PropTypes.number.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
};

export default withStyles(styles)(ContactDetail);
