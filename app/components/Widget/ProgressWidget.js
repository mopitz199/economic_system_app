import React from 'react';
import PropTypes from 'prop-types';
import Type from 'ba-styles/Typography.scss';
import Check from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress, Paper, Typography, Grid, Avatar, Chip } from '@material-ui/core';
import styles from './widget-jss';


function ProgressWidget(props) {
  const { classes } = props;
  return (
    <Paper className={classes.styledPaper} elevation={4}>
      <Typography className={classes.title} variant="h5" component="h3">
        <span className={Type.light}>Profile Strength: </span>
        <span className={Type.bold}>Intermediate</span>
      </Typography>
      <Grid container justify="center">
        <Chip
          avatar={(
            <Avatar>
              <Check />
            </Avatar>
          )}
          label="60% Progress"
          className={classes.chipProgress}
          color="primary"
        />
      </Grid>
      <LinearProgress variant="determinate" className={classes.progressWidget} value={60} />
    </Paper>
  );
}

ProgressWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProgressWidget);
