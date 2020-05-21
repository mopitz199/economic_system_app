import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import avatarApi from 'ba-api/avatars';
import CustomCard from './CustomCard';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});


function Assets(props){
  const { classes } = props;
  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item md={2}>
        <CustomCard
          avatar={avatarApi[2]}
          name="BTC"
          subText="Bitcoin"
        />
      </Grid>
      <Grid item md={2}>
        <CustomCard
          avatar={avatarApi[2]}
          name="BTC"
          subText="Bitcoin"
        />
      </Grid>
      <Grid item md={2}>
        <CustomCard
          avatar={avatarApi[2]}
          name="BTC"
          subText="Bitcoin"
        />
      </Grid>
      <Grid item md={2}>
        <CustomCard
          avatar={avatarApi[2]}
          name="BTC"
          subText="Bitcoin"
        />
      </Grid>
      <Grid item md={2}>
        <CustomCard
          avatar={avatarApi[2]}
          name="BTC"
          subText="Bitcoin"
        />
      </Grid>
      <Grid item md={2}>
        <CustomCard
          avatar={avatarApi[2]}
          name="BTC"
          subText="Bitcoin"
        />
      </Grid>
      <Grid item md={2}>
        <CustomCard
          avatar={avatarApi[2]}
          name="BTC"
          subText="Bitcoin"
        />
      </Grid>
      <Grid item md={2}>
        <CustomCard
          avatar={avatarApi[2]}
          name="BTC"
          subText="Bitcoin"
        />
      </Grid>
      <Grid item md={2}>
        <CustomCard
          avatar={avatarApi[2]}
          name="BTC"
          subText="Bitcoin"
        />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Assets);