import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import imgData from 'ba-api/imgData';
import { Grid, GridList, GridListTile, ButtonBase, Typography } from '@material-ui/core';
import styles from './profile-jss';


function Albums(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        spacing={3}
      >
        <Grid item md={6} sm={12} xs={12}>
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
          >
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {imgData.map((tile, index) => {
                if (index > 6) {
                  return false;
                }
                return (
                  <GridListTile key={index.toString()} cols={tile.cols || 1}>
                    <img src={tile.img} className={classes.img} alt={tile.title} />
                  </GridListTile>
                );
              })}
            </GridList>
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                Album Number One
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
          >
            <GridList cellHeight={160} className={classes.gridListAlbum} cols={3}>
              {imgData.map((tile, index) => {
                if (index > 2 && index < 9) {
                  return false;
                }
                return (
                  <GridListTile key={index.toString()} cols={tile.cols || 1}>
                    <img src={tile.img} className={classes.img} alt={tile.title} />
                  </GridListTile>
                );
              })}
            </GridList>
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                Album Number Three
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
          >
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {imgData.map((tile, index) => {
                if (index > 4 && index < 10) {
                  return false;
                }
                return (
                  <GridListTile key={index.toString()} cols={tile.cols || 1}>
                    <img src={tile.img} className={classes.img} alt={tile.title} />
                  </GridListTile>
                );
              })}
            </GridList>
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                Album Number Two
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
          >
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {imgData.map((tile, index) => {
                if (index % 2) {
                  return false;
                }
                return (
                  <GridListTile key={index.toString()} cols={tile.cols || 1}>
                    <img src={tile.img} className={classes.img} alt={tile.title} />
                  </GridListTile>
                );
              })}
            </GridList>
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                Album Number Four
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        </Grid>
      </Grid>
    </div>
  );
}

Albums.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Albums);
