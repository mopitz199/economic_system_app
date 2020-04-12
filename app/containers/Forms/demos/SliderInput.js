import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import { withStyles } from '@material-ui/core/styles';
import 'ba-styles/vendors/react-input-range/react-input-range.css';

import { FormControl, Typography, Grid } from '@material-ui/core';

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
  },
  inputRange: {
    width: 200,
    margin: `${theme.spacing(3)}px 5px`,
  }
});

class SliderInput extends PureComponent {
  state = {
    value: 10,
    valueDisabled: 5,
    valueDecimal: 16,
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid
          container
          alignItems="flex-start"
          justify="space-around"
          direction="row"
          spacing={2}
        >
          <Grid
            item
            md={4}
            className={classes.demo}
          >
            <Typography variant="button" className={classes.divider}>Slider Input Basic</Typography>
            <FormControl className={classes.formControl}>
              <div className={classes.inputRange}>
                <InputRange
                  maxValue={20}
                  minValue={0}
                  value={this.state.value}
                  onChange={value => this.setState({ value })}
                />
              </div>
            </FormControl>
          </Grid>
          <Grid
            item
            md={4}
            className={classes.demo}
          >
            <Typography variant="button" className={classes.divider}>Slider Input Disabled</Typography>
            <FormControl className={classes.formControl}>
              <div className={classes.inputRange}>
                <InputRange
                  maxValue={20}
                  minValue={0}
                  disabled
                  value={this.state.valueDisabled}
                  onChange={value => this.setState({ valueDisabled: value })}
                />
              </div>
            </FormControl>
          </Grid>
          <Grid
            item
            md={4}
            className={classes.demo}
          >
            <Typography variant="button" className={classes.divider}>Formated Value</Typography>
            <FormControl className={classes.formControl}>
              <div className={classes.inputRange}>
                <InputRange
                  maxValue={20}
                  minValue={0}
                  formatLabel={value => value.toFixed(2)}
                  value={this.state.valueDecimal}
                  onChange={value => this.setState({ valueDecimal: value })}
                />
              </div>
            </FormControl>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

SliderInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SliderInput);
