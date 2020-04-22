import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  progress: {
    margin: theme.spacing(2),
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <CircularProgress className={classes.progress} size={50} />
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);