import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';

import {
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Dialog,
  DialogTitle,
  Typography,
  Grid,
} from '@material-ui/core';

const emails = ['username@mail.com', 'user02@mail.com'];
const styles = ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const SimpleDialog = props => {
  const {
    classes,
    onClose,
    selectedValue,
    ...other
  } = props;

  function handleClose() {
    props.onClose(this.props.selectedValue);
  }

  function handleListItemClick(value) {
    props.onClose(value);
  }

  return (
    <Dialog onClose={() => handleClose()} aria-labelledby="simple-dialog-title" {...other}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <div>
        <List>
          {emails.map(email => (
            <ListItem button onClick={() => handleListItemClick(email)} key={email}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          ))}
          <ListItem button onClick={() => handleListItemClick('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="add account" />
          </ListItem>
        </List>
      </div>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SelectDialog extends React.Component {
  state = {
    open: false,
    selectedValue: emails[1],
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <div>
        <Grid container justify="center" direction="column">
          <Typography variant="subtitle1">
Selected:
            <strong>{this.state.selectedValue}</strong>
          </Typography>
          <br />
          <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Open simple dialog</Button>
          <SimpleDialogWrapped
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
          />
        </Grid>
      </div>
    );
  }
}


export default SelectDialog;
