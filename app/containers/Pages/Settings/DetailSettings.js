import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import SettingsIcon from '@material-ui/icons/SettingsApplications';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Grid,
  Dialog,
  Toolbar,
  ListItemText,
  ListItem,
  List,
  ListItemSecondaryAction,
  Divider,
  IconButton,
  Typography,
  Button,
  Switch,
  Slide,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  TextField,
} from '@material-ui/core';
import styles from './settings-jss';


const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

class DetailSettings extends React.Component {
  state = {
    checked: ['switch', 'check2'],
    option: '',
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeSelection = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, open, handleClose } = this.props;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Setting
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              done
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container justify="center">
          <Grid item md={8} xs={12}>
            <List>
              <ListItem>
                <ListItemText primary="Switch input" secondary="Odio ac imperdiet luctus" />
                <ListItemSecondaryAction>
                  <Switch
                    onChange={this.handleToggle('switch')}
                    checked={this.state.checked.indexOf('switch') !== -1}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Another switch input" secondary="Lorem Ipsum" />
                <ListItemSecondaryAction>
                  <Switch
                    onChange={this.handleToggle('switch2')}
                    checked={this.state.checked.indexOf('switch2') !== -1}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Checkbox input" secondary="Dolor sit amet" />
                <ListItemSecondaryAction>
                  <Checkbox
                    onChange={this.handleToggle('check')}
                    checked={this.state.checked.indexOf('check') !== -1}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Another checkbox input" secondary="Donec dignissim" />
                <ListItemSecondaryAction>
                  <Checkbox
                    onChange={this.handleToggle('check2')}
                    checked={this.state.checked.indexOf('check2') !== -1}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Selection field" secondary="Nam posuere accumsan porta" />
                <ListItemSecondaryAction>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Option</InputLabel>
                    <Select
                      value={this.state.option}
                      onChange={this.handleChangeSelection}
                      inputProps={{
                        name: 'option',
                        id: 'opt-simple',
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Option Ten</MenuItem>
                      <MenuItem value={20}>Option Twenty</MenuItem>
                      <MenuItem value={30}>Option Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Input text" secondary="Donec dignissim, odio ac imperdiet luctus" />
                <ListItemSecondaryAction>
                  <TextField
                    id="name"
                    label="Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Input text" secondary="Donec dignissim, odio ac imperdiet luctus" />
                <ListItemSecondaryAction>
                  <Button variant="outlined" size="small" color="secondary" className={classes.button}>
                    Action Button
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Input text" secondary="Donec dignissim, odio ac imperdiet luctus" />
                <ListItemSecondaryAction>
                  <Button variant="outlined" size="small" color="secondary">
                    <SettingsIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                    Action Button Icon
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}

DetailSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(DetailSettings);
