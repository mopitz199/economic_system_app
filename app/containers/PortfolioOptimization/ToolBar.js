import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  CircularProgress,
  FormHelperText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import Save from '@material-ui/icons/Save';
import { AssetSearch } from 'components';


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
  subToolBox: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(1),
    borderTop: '5px solid',
    borderColor: theme.palette.grey['500']
  }
});


const stylesValidateButton = theme => ({
  iconSmall: {
    fontSize: 20,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  wrapper: {
    position: 'relative',
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  buttonProgress: {
    color: theme.palette.success.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});
function ValidateButton(props) {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Button
        className={classes.button}
        variant="contained"
        disabled={props.loading}
        onClick={props.onClick}
      >
        <CheckIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Validate
      </Button>
      {props.loading && <CircularProgress size={16} className={classes.buttonProgress} />}
    </div>
  );
}
const ValidateButtonComponent = withStyles(stylesValidateButton)(ValidateButton);


function ToolBar(props) {
  const { classes } = props;
  return (
    <Box display="flex" justifyContent="flex-start" className={classes.root} flexDirection="column">
      <Box display="flex" justifyContent="flex-start" flexDirection="row" width={1}>
        <Box display="flex" width={1 / 2}>
          <AssetSearch
            value={props.searchValue}
            onChange={(value) => props.onSearchChange(value)}
            onBlur={(value) => props.onSearchBlur(value)}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={() => { props.onAddClick(); }}
          >
            ADD
            <AddIcon className={classes.rightIcon} />
          </Button>
        </Box>
        <Box width={1} display="flex" justifyContent="flex-end">
          <ValidateButtonComponent
            onClick={props.onValidateClick}
            loading={props.loadingValidation}
          />
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            onClick={() => { props.onSaveClick(); }}
          >
            <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
            Save
          </Button>
        </Box>
      </Box>
      <Box className={classes.subToolBox}>
        <FormControl
          error={props.nameErrorMessage != ''}
        >
          <InputLabel htmlFor="adornment-name">Name</InputLabel>
          <Input
            id="adornment-name"
            value={props.name}
            onChange={props.onChangeName}
          />
          <FormHelperText id="name-error-text">
            {props.nameErrorMessage}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={props.minDisposedToLoseErrorMessage != ''}
        >
          <InputLabel htmlFor="adornment-amount">Min disposed to lose</InputLabel>
          <Input
            id="adornment-amount"
            value={props.minDisposedToLoseValue}
            onChange={props.onMinDisposedToLoseChange}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
          <FormHelperText id="name-error-text">
            {props.minDisposedToLoseErrorMessage}
          </FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
}

export default withStyles(styles)(ToolBar);
