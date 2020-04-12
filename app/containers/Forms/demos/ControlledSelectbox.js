import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from '@material-ui/core';

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
  },
  field: {
    margin: `${theme.spacing(3)}px 5px`,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
});

class ControlledSelectbox extends PureComponent {
  state = {
    open: false,
    openRemotely: false,
    age: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleChangeControll = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickOpenRemot = () => {
    this.setState({ openRemotely: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleCloseRemot = () => {
    this.setState({ openRemotely: false });
  };

  handleOpenRemot = () => {
    this.setState({ openRemotely: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid
          container
          alignItems="flex-start"
          justify="space-around"
          direction="row"
          spacing={3}
        >
          <Grid
            item
            md={6}
            className={classes.demo}
          >
            <Typography variant="button" className={classes.divider}>With a Dialog</Typography>
            <Typography className={classes.divider}>While its not encouraged by the Material Design specification, you can use a select inside a dialog.</Typography>
            <div>
              <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>Open select dialog</Button>
              <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={this.state.open}
                onClose={this.handleClose}
              >
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                  <form className={classes.container}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                      <Select
                        native
                        value={this.state.age}
                        onChange={this.handleChange('age')}
                        input={<Input id="age-native-simple" />}
                      >
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-simple">Age</InputLabel>
                      <Select
                        value={this.state.age}
                        onChange={this.handleChange('age')}
                        input={<Input id="age-simple" />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
          <Grid
            item
            md={6}
            className={classes.demo}
          >
            <Typography variant="button" className={classes.divider}>Controlled open Select</Typography>
            <div>
              <form autoComplete="off">
                <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClickOpenRemot}>
                  Open the select
                </Button>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="controlled-open-select">Age</InputLabel>
                  <Select
                    open={this.state.openRemotely}
                    onClose={this.handleCloseRemot}
                    onOpen={this.handleOpenRemot}
                    value={this.state.age}
                    onChange={this.handleChangeControll}
                    inputProps={{
                      name: 'age',
                      id: 'controlled-open-select',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

ControlledSelectbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledSelectbox);
