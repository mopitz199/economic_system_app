import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Box, Button, FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import Save from '@material-ui/icons/Save';
import { AssetSearch } from 'components';


const styles = theme => {
  console.log(theme)
  return {
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
    subToolBox:{
      marginTop: theme.spacing(3),
      paddingTop: theme.spacing(1),
      borderTop: '5px solid',
      borderColor: theme.palette.grey['500']
    }
  }
}


function ToolBar(props){
  const { classes } = props;
  return (
    <Box display="flex" justifyContent="flex-start" className={classes.root} flexDirection="column">
      <Box display="flex" justifyContent="flex-start" flexDirection="row" width={1}>
        <Box display="flex" width={1/2}>
          <AssetSearch
            value={props.searchValue}
            onChange={(value) => props.onSearchChange(value)}
            onBlur={(value) => props.onSearchBlur(value)}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={() => {props.onAddClick()}}
          >
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
      <Box className={classes.subToolBox}>
        <FormControl>
          <InputLabel htmlFor="adornment-amount">Min disposed to lose</InputLabel>
          <Input
            id="adornment-amount"
            value={props.minDisposedToLoseValue}
            onChange={props.onMinDisposedToLoseChange}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </FormControl>
      </Box>
    </Box>
  )
}

export default withStyles(styles)(ToolBar);