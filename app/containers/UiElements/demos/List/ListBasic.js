import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import { red, green, amber } from '@material-ui/core/colors';

import {
  Typography, Grid, List,
  ListItem, ListItemText, ListItemAvatar,
  Avatar, Divider
} from '@material-ui/core';

const styles = theme => ({
  root: {
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
    margin: 10
  },
  avatarRed: {
    backgroundColor: red[500],
  },
  avatarGreen: {
    backgroundColor: green[500],
  },
  avatarAmber: {
    backgroundColor: amber[500],
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
  }
});

class ListBasic extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid
          container
          alignItems="flex-start"
          justify="flex-start"
          direction="row"
          spacing={2}
        >
          <Grid item md={6} xs={12}>
            <Typography variant="button" className={classes.divider}>Simple List Divider</Typography>
            <div className={classes.root}>
              <List component="nav">
                <ListItem button>
                  <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button divider>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Trash" />
                </ListItem>
                <Divider light />
                <ListItem button>
                  <ListItemText primary="Spam" />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="button" className={classes.divider}>Inset Divider</Typography>
            <div className={classes.root}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatarRed}>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <li>
                  <Divider variant="inset" />
                </li>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatarGreen}>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Work" secondary="Jan 7, 2014" />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatarAmber}>
                      <BeachAccessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

ListBasic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListBasic);
