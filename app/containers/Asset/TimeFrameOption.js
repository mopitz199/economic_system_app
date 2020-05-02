import React from 'react';
import {Chip, Avatar} from '@material-ui/core';
import { createMuiTheme, withStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import ThemePallete from 'ba-api/themePalette';
import classnames from 'classnames';

const theme = createMuiTheme(ThemePallete.greyTheme);

const styles = theme => {
  return {
    activeTimeFrame: {
      //backgroundColor: `${theme.palette.primary.light} !important`,
    }
  }
}


function TimeFrameOption(props){
  const theme = useTheme();
  const {classes} = props;
  return (
    <ThemeProvider theme={theme}>
      <Chip
        avatar={<Avatar>{props.avatarText}</Avatar>}
        label={props.label}
        className = {classnames({
          [`${classes.activeTimeFrame}`]: props.timeFrame == props.currentTimeFrame
        })}
        onClick={props.onClick}
        color={props.timeFrame == props.currentTimeFrame ? "primary" : "default"}
      />
    </ThemeProvider>
  )
}

export default withStyles(styles)(TimeFrameOption);