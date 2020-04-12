import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Rating } from 'ba-components';

import { FormControl, Typography, Grid } from '@material-ui/core';

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  field: {
    margin: `${theme.spacing(3)}px 5px`,
  },
});

class RatingCustom extends PureComponent {
  state = {
    rating: 3
  }

  handleChange = value => {
    this.setState({ rating: value });
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
            <Typography variant="button" className={classes.divider}>Ratting Normal</Typography>
            <FormControl className={classes.formControl}>
              <Rating
                value={this.state.rating}
                max={5}
                onChange={(value) => this.handleChange(value)}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            md={4}
            className={classes.demo}
          >
            <Typography variant="button" className={classes.divider}>Read Only</Typography>
            <FormControl className={classes.formControl}>
              <Rating
                value={2}
                max={5}
                readOnly
              />
            </FormControl>
          </Grid>
          <Grid
            item
            md={4}
            className={classes.demo}
          >
            <Typography variant="button" className={classes.divider}>Disabled</Typography>
            <FormControl className={classes.formControl}>
              <Rating
                value={4}
                max={5}
                disabled
              />
            </FormControl>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

RatingCustom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RatingCustom);
