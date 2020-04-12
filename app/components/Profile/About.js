import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import LocalPhone from '@material-ui/icons/LocalPhone';
import DateRange from '@material-ui/icons/DateRange';
import LocationOn from '@material-ui/icons/LocationOn';
import InfoIcon from '@material-ui/icons/Info';
import Check from '@material-ui/icons/Check';
import AcUnit from '@material-ui/icons/AcUnit';
import Adb from '@material-ui/icons/Adb';
import AllInclusive from '@material-ui/icons/AllInclusive';
import AssistantPhoto from '@material-ui/icons/AssistantPhoto';
import imgData from 'ba-api/imgData';
import Type from 'ba-styles/Typography.scss';
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  LinearProgress,
  Divider,
  Chip,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from '@material-ui/core';
import Timeline from '../SocialMedia/Timeline';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './profile-jss';


class About extends React.Component {
  render() {
    const { classes, data } = this.props;
    return (
      <Grid
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="row"
        spacing={3}
      >
        <Grid item md={7} xs={12}>
          <div>
            <Timeline dataTimeline={data} />
          </div>
        </Grid>
        <Grid item md={5} xs={12}>
          {/* Profile Progress */}
          <div className={classes.progressRoot}>
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
                  className={classes.chip}
                  color="primary"
                />
              </Grid>
              <LinearProgress variant="determinate" className={classes.progress} value={60} />
            </Paper>
          </div>
          {/* ----------------------------------------------------------------------*/}
          {/* About Me */}
          <PapperBlock title="About Me" whiteBg noMargin desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed urna in justo euismod condimentum.">
            <Divider className={classes.divider} />
            <List dense className={classes.profileList}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <DateRange />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Born" secondary="Jan 9, 1994" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocalPhone />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Phone" secondary="(+62)8765432190" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocationOn />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Address" secondary="Chicendo Street no.105 Block A/5A - Barcelona, Spain" />
              </ListItem>
            </List>
          </PapperBlock>
          {/* ----------------------------------------------------------------------*/}
          {/* My Albums */}
          <PapperBlock title="My Albums (6)" whiteBg desc="">
            <div className={classes.albumRoot}>
              <GridList cellHeight={180} className={classes.gridList}>
                {
                  imgData.map((tile, index) => {
                    if (index >= 4) {
                      return false;
                    }
                    return (
                      <GridListTile key={index.toString()}>
                        <img src={tile.img} className={classes.img} alt={tile.title} />
                        <GridListTileBar
                          title={tile.title}
                          subtitle={(
                            <span>
by:
                              {tile.author}
                            </span>
                          )}
                          actionIcon={(
                            <IconButton className={classes.icon}>
                              <InfoIcon />
                            </IconButton>
                          )}
                        />
                      </GridListTile>
                    );
                  })
                }
              </GridList>
            </div>
            <Divider className={classes.divider} />
            <Grid container justify="center">
              <Button color="secondary" className={classes.button}>
                See All
              </Button>
            </Grid>
          </PapperBlock>
          {/* ----------------------------------------------------------------------*/}
          {/* My Connection Me */}
          <PapperBlock title="My Connection" whiteBg desc="">
            <List dense className={classes.profileList}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>H</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Harry Wells" secondary="2 Mutual Connection" />
              </ListItem>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>J</Avatar>
                </ListItemAvatar>
                <ListItemText primary="John DOe" secondary="8 Mutual Connection" />
              </ListItem>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>V</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Victor Wanggai" secondary="12 Mutual Connection" />
              </ListItem>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>H</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Baron Phoenix" secondary="10 Mutual Connection" />
              </ListItem>
            </List>
            <Divider className={classes.divider} />
            <Grid container justify="center">
              <Button color="secondary" className={classes.button}>
                See All
              </Button>
            </Grid>
          </PapperBlock>
          {/* ----------------------------------------------------------------------*/}
          {/* My Interests */}
          <PapperBlock title="My Interests" whiteBg desc="">
            <Grid container className={classes.colList}>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                      <AcUnit />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Snow" secondary="100 Connected" />
                </ListItem>
              </Grid>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                      <Adb />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Android" secondary="120 Connected" />
                </ListItem>
              </Grid>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>
                      <AllInclusive />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="All Inclusive" secondary="999+ Connected" />
                </ListItem>
              </Grid>
              <Grid item md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>
                      <AssistantPhoto />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="My Country" secondary="99+ Connected" />
                </ListItem>
              </Grid>
            </Grid>
          </PapperBlock>
          {/* ----------------------------------------------------------------------*/}
        </Grid>
      </Grid>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default withStyles(styles)(About);
