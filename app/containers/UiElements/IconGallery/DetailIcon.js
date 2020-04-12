import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import themeSource from 'react-syntax-highlighter/styles/prism/prism';
import { withStyles } from '@material-ui/core/styles';

import {
  Typography,
  Button,
  Icon,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

const humanize = (str, space) => {
  let string = str;
  if (str === '3d_rotation') {
    string = 'three_d_rotation';
  }
  const frags = string.split('_');
  for (let i = 0; i < frags.length; i += 1) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }

  if (space) {
    return frags.join(' ');
  }
  return frags.join('');
};

const styles = theme => ({
  code: {
    fontSize: 12,
    padding: '5px !important'
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
  },
  bigIcon: {
    textAlign: 'center',
    marginBottom: 30,
    '& span': {
      fontSize: 128
    }
  },
  title: {
    marginBottom: 40,
    fontSize: 22,
    paddingBottom: 20,
    position: 'relative',
    fontWeight: 500,
    color: theme.palette.grey[700],
    textTransform: 'uppercase',
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      bottom: 0,
      left: 24,
      width: 40,
      borderBottom: `5px solid ${theme.palette.primary.main}`
    }
  },
});

class DetailIcon extends React.Component {
  render() {
    registerLanguage('jsx', jsx);
    const {
      isOpenDetail,
      iconName,
      iconCode,
      closeDetail
    } = this.props;
    const { classes } = this.props;
    const linkCode = '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />';
    const fontCode = '<Icon>' + iconName + '</Icon>';
    const importCode = 'import ' + humanize(iconName, false) + " from '@material-ui/icons/" + humanize(iconName, false) + "';";
    const importIconCode = "import Icon from '@material-ui/core/Icon';";
    const svgCode = '<' + humanize(iconName, false) + ' />';
    return (
      <Dialog
        open={isOpenDetail}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        onClose={closeDetail}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
          {humanize(iconName, true)}
          {' '}
(
          {iconCode}
)
        </DialogTitle>
        <DialogContent>
          <div className={classes.bigIcon}>
            <Icon className={classes.icon}>{iconName}</Icon>
          </div>
          <Typography variant="subtitle1" gutterBottom>Use with Font Icons</Typography>
          <SyntaxHighlighter className={classes.code} language="jsx" style={themeSource}>
            {linkCode}
          </SyntaxHighlighter>
          <SyntaxHighlighter className={classes.code} language="jsx" style={themeSource}>
            {importIconCode}
          </SyntaxHighlighter>
          <SyntaxHighlighter className={classes.code} language="jsx" style={themeSource}>
            {fontCode}
          </SyntaxHighlighter>
          <Divider className={classes.divider} />
          <Typography variant="subtitle1" gutterBottom>Use with SVG Material icons</Typography>
          <SyntaxHighlighter className={classes.code} language="jsx" style={themeSource}>
            {importCode}
          </SyntaxHighlighter>
          <SyntaxHighlighter className={classes.code} language="jsx" style={themeSource}>
            {svgCode}
          </SyntaxHighlighter>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetail} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DetailIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpenDetail: PropTypes.bool.isRequired,
  closeDetail: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  iconCode: PropTypes.string.isRequired,
};

export default withStyles(styles)(DetailIcon);
