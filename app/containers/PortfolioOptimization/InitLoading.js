import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
  return {
    root: {
      height: '500px',
      width: '100%',
    },
    progress: {
      margin: theme.spacing(2),
    },
  }
}

function InitLoading(props){
  const {classes} = props
  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress className={classes.progress} color="secondary" />
    </Box>
  )
}
export default withStyles(styles)(InitLoading)
