import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Box, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import Save from '@material-ui/icons/Save';
import AssetSearch from './AssetSearch';


const styles = theme => ({
  root: {
    marginBottom: theme.spacing(4)
  },
  paper: {
    height: 140,
    width: 100,
    backgroundColor: theme.palette.secondary.light,
  },
  control: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
});


function ToolBar(props){
  const { classes } = props;
  return (
    <Box display="flex" justifyContent="flex-start" flexDirection="row" className={classes.root}>
      <Box display="flex" width={1/2}>
        <AssetSearch />
        <Button className={classes.button} variant="contained" color="secondary">
          ADD
          <AddIcon className={classes.rightIcon} />
        </Button>
      </Box>
      <Box width={1} display="flex" justifyContent="flex-end">
        <Button className={classes.button} variant="contained" size="small">
          <CheckIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          Validate
        </Button>
        <Button className={classes.button} variant="contained" size="small">
          <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default withStyles(styles)(ToolBar);