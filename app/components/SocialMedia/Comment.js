import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Type from 'ba-styles/Typography.scss';
import { withStyles } from '@material-ui/core/styles';
import Send from '@material-ui/icons/Send';
import CommentIcon from '@material-ui/icons/Comment';
import CloseIcon from '@material-ui/icons/Close';
import dummy from 'ba-api/dummyContents';
import {
  Typography,
  List,
  ListItem,
  Avatar,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Fab,
  Slide,
  Divider,
  withMobileDialog,
} from '@material-ui/core';
import styles from './jss/socialMedia-jss';

const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

class Comment extends React.Component {
  state = {
    comment: ''
  };

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = comment => {
    this.props.submitComment(comment);
    this.setState({ comment: '' });
  }

  render() {
    const {
      open,
      handleClose,
      classes,
      dataComment,
      fullScreen
    } = this.props;
    const { comment } = this.state;
    const getItem = dataArray => dataArray.map(data => (
      <Fragment key={data.get('id')}>
        <ListItem>
          <div className={classes.commentContent}>
            <div className={classes.commentHead}>
              <Avatar alt="avatar" src={data.get('avatar')} className={classes.avatar} />
              <section>
                <Typography variant="subtitle1">{data.get('from')}</Typography>
                <Typography variant="caption"><span className={classNames(Type.light, Type.textGrey)}>{data.get('date')}</span></Typography>
              </section>
            </div>
            <Typography className={classes.commentText}>{data.get('message')}</Typography>
          </div>
        </ListItem>
        <Divider variant="inset" />
      </Fragment>
    ));

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          TransitionComponent={Transition}
          maxWidth="md"
        >
          <DialogTitle id="form-dialog-title">
            <CommentIcon />
            {' '}
            {dataComment !== undefined && dataComment.size}
            &nbsp;Comment
            {dataComment !== undefined && dataComment.size > 1 ? 's' : ''}
            <IconButton onClick={handleClose} className={classes.buttonClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <List>
              {dataComment !== undefined && getItem(dataComment)}
            </List>
          </DialogContent>
          <DialogActions className={classes.commentAction}>
            <div className={classes.commentForm}>
              <Avatar alt="avatar" src={dummy.user.avatar} className={classes.avatarMini} />
              <Input
                placeholder="Write Comment"
                onChange={this.handleChange}
                value={comment}
                className={classes.input}
                inputProps={{
                  'aria-label': 'Comment',
                }}
              />
              <Fab size="small" onClick={() => this.handleSubmit(comment)} color="secondary" aria-label="send" className={classes.button}>
                <Send />
              </Fab>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Comment.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  dataComment: PropTypes.object,
  fullScreen: PropTypes.bool.isRequired,
};

Comment.defaultProps = {
  dataComment: undefined
};

const CommentResponsive = withMobileDialog()(Comment);
export default withStyles(styles)(CommentResponsive);
