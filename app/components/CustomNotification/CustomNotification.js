import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import messageStyles from 'ba-styles/Messages.scss';

import { green, amber } from '@material-ui/core/colors';

import { Typography, Button, IconButton, Snackbar, SnackbarContent, Grid } from '@material-ui/core';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const {
    classes,
    className,
    message,
    onClose,
    variant,
    ...other
  } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      )}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

MySnackbarContent.defaultProps = {
  onClose: () => {}
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class CustomSnackbar extends React.Component{
  state = {
    openStyle: this.props.initOpenValue,
  };

  handleClickStyle = () => {
    this.setState({ openStyle: true });
  };

  handleCloseStyle = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openStyle: false });
  };

  render(){
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.openStyle}
        autoHideDuration={6000}
        onClose={this.handleCloseStyle}
      >
        <MySnackbarContentWrapper
          onClose={this.handleCloseStyle}
          variant={this.props.variant}
          message={this.props.message}
        />
      </Snackbar>
    )
  }
}

export default CustomSnackbar;
