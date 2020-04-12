import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Grid,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Slide,
  Button,
} from '@material-ui/core';
import styles from './themeStyles-jss';
import ThemeThumb from './ThemeThumb';

const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Slide direction="left" ref={ref} {...props} />;
});

class TemplateSettings extends React.Component { // eslint-disable-line
  render() {
    const {
      classes,
      palette,
      open,
      selectedValue,
      changeTheme,
      close
    } = this.props;
    const getItem = dataArray => dataArray.map((item, index) => (
      <FormControlLabel
        key={index.toString()}
        className={classes.themeField}
        control={(
          <ThemeThumb
            value={item.value}
            selectedValue={selectedValue}
            handleChange={changeTheme}
            name={item.name}
          />
        )}
      />
    ));
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        className={classes.themeChooser}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Icon>palette</Icon>
          {' '}
Choose Theme
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <FormControl component="fieldset" className={classes.group}>
              { palette !== undefined && getItem(palette) }
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

TemplateSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  palette: PropTypes.object,
  selectedValue: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

TemplateSettings.defaultProps = {
  palette: undefined
};

export default withStyles(styles)(TemplateSettings);
