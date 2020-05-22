import React from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PapperBlock from '../../components/PapperBlock/PapperBlock';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar, Button, IconButton, SnackbarContent  } from '@material-ui/core';
import ToolBar from './ToolBar';
import Assets from './Assets';
import messageStyles from 'ba-styles/Messages.scss';


const styles = theme => {
  return {
    success: {
      backgroundColor: theme.palette.success.main,
    },
    error: {
      backgroundColor: theme.palette.error.main,
    },
    close: {
      width: theme.spacing(4)
    },
    divider: {
      margin: `${theme.spacing(3)}px 0`,
    },
    button: {
      margin: theme.spacing(1)
    }
  }
}

function CustomSnackBar(props){
  const {classes} = props
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={props.open}
      autoHideDuration={6000}
      onClose={props.onClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
    >
      <SnackbarContent
        className={classNames(
          props.type=="success" ? classes.success : "",
          props.type=="error" ? classes.error : ""
        )}
        message={<span id="message-id">{props.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      >

      </SnackbarContent>
    </Snackbar>
  )
}

export default withStyles(styles)(CustomSnackBar)