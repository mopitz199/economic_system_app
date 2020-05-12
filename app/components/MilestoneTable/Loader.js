import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { purple } from '@material-ui/core/colors';
import { CircularProgress, Box } from '@material-ui/core';

const styles = theme => ({
  progress: {
    margin: theme.spacing(2),
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <Box
      style={{height: `${props.height}px`}}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress
        className={classnames(classes.progress)}
        size={50}
      />
    </Box>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);