import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Fab, IconButton, Tooltip, Typography, Grid } from '@material-ui/core';

const styles = theme => ({
  fab: {
    margin: theme.spacing(2),
  },
  fixed: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
    textAlign: 'center'
  },
});

class SimpleTooltips extends React.Component {
  state = {
    open: false,
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid
          container
          alignItems="flex-start"
          justify="flex-start"
          direction="row"
          spacing={2}
        >
          <Grid
            item
            md={6}
          >
            <Typography variant="button" className={classes.divider}>Simple Tooltips</Typography>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="row"
              spacing={2}
            >
              <Tooltip title="Delete">
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add">
                <Fab color="primary" aria-label="Add" className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Tooltip>
              <br />
              <br />
              <Tooltip title="FAB 'position: absolute;'">
                <Fab color="secondary" className={classes.fixed}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid
            item
            md={6}
          >
            <Typography variant="button" className={classes.divider}>Delayed Tooltips</Typography>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="row"
              spacing={2}
            >
              <Tooltip
                enterDelay={300}
                leaveDelay={300}
                onClose={this.handleTooltipClose}
                onOpen={this.handleTooltipOpen}
                open={this.state.open}
                placement="bottom"
                title="Delete"
              >
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTooltips);
