import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import {
  Switch,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  FormHelperText,
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
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: `${theme.spacing(1)}px 0`,
  },
  switchBase: {
    color: green[50],
    '&$checked': {
      color: green[500],
      '& + $bar': {
        backgroundColor: green[500],
      },
    },
  },
  bar: {},
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
});

class RadioButton extends PureComponent {
  state = {
    checkedA: true,
    checkedB: true,
    checkedF: true,
    gilad: true,
    jason: false,
    antoine: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
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
            md={3}
            className={classes.demo}
          >
            <Typography variant="button" className={classes.divider}>Basic usage</Typography>
            <div>
              <Switch
                checked={this.state.checkedA}
                onChange={this.handleChange('checkedA')}
                value="checkedA"
              />
              <Switch
                checked={this.state.checkedB}
                onChange={this.handleChange('checkedB')}
                value="checkedB"
                color="primary"
              />
              <Switch value="checkedC" />
              <Switch disabled value="checkedD" />
              <Switch disabled checked value="checkedE" />
              <Switch defaultChecked value="checkedF" color="default" />
            </div>
          </Grid>
          <Grid
            item
            md={4}
            className={classes.demo}
          >
            <Typography variant="button" className={classes.divider}>Switch with label</Typography>
            <Typography className={classes.divider}>Switch can also be used with a label description thanks to the FormControlLabel component.</Typography>
            <div>
              <FormGroup row>
                <FormControlLabel
                  control={(
                    <Switch
                      checked={this.state.checkedA}
                      onChange={this.handleChange('checkedA')}
                      value="checkedA"
                    />
                  )}
                  label="Secondary"
                />
                <FormControlLabel
                  control={(
                    <Switch
                      checked={this.state.checkedB}
                      onChange={this.handleChange('checkedB')}
                      value="checkedB"
                      color="primary"
                    />
                  )}
                  label="Primary"
                />
                <FormControlLabel control={<Switch value="checkedC" />} label="Uncontrolled" />
                <FormControlLabel disabled control={<Switch value="checkedD" />} label="Disabled" />
                <FormControlLabel disabled control={<Switch checked value="checkedE" />} label="Disabled" />
                <FormControlLabel
                  control={(
                    <Switch
                      checked={this.state.checkedF}
                      onChange={this.handleChange('checkedF')}
                      value="checkedF"
                      classes={{
                        switchBase: classes.switchBase,
                        checked: classes.checked,
                        track: classes.bar,
                      }}
                    />
                  )}
                  label="Custom color"
                />
              </FormGroup>
            </div>
          </Grid>
          <Grid
            item
            md={5}
            className={classes.demo}
          >
            <Typography variant="button" className={classes.divider}>Switch in Form Group</Typography>
            <Typography className={classes.divider}>FormGroup is a helpful wrapper used to group selection controls components that provides an easier API. However, we encourage you to use a Checkbox instead.</Typography>
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Assign responsibility</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={this.state.gilad}
                        onChange={this.handleChange('gilad')}
                        value="gilad"
                      />
                    )}
                    label="Gilad Gray"
                  />
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    )}
                    label="Jason Killian"
                  />
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={this.state.antoine}
                        onChange={this.handleChange('antoine')}
                        value="antoine"
                      />
                    )}
                    label="Antoine Llorca"
                  />
                </FormGroup>
                <FormHelperText>Be careful</FormHelperText>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

RadioButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButton);
