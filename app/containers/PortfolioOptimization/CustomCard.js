import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Avatar,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@material-ui/core';
import styles from '../../components/CardPaper/cardStyle-jss';


class CustomCard extends React.Component {
  state = { anchorElOpt: null };

  handleClickOpt = event => {
    alert("close")
  };

  render() {
    const {
      classes,
      avatar,
      name,
      subText,
      image,
    } = this.props;
    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar alt="avatar" src={avatar} className={classes.avatar} />
          }
          action={(
            <IconButton
              aria-label="Close"
              className={classes.button}
              onClick={this.handleClickOpt}
            >
              <CancelIcon />
            </IconButton>
          )}
          title={name}
          subheader={subText}
        />
        { image !== ''
          && (
            <CardMedia
              className={classes.media}
              image={image}
              title="Contemplative Reptile"
            />
          )
        }
        <CardContent>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="adornment-amount">Min</InputLabel>
            <Input
              id="adornment-amount"
              value={this.state.amount}
              onChange={null}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="adornment-amount">Max</InputLabel>
            <Input
              id="adornment-amount"
              value={this.state.amount}
              onChange={null}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
          </FormControl>
        </CardContent>
      </Card>
    );
  }
}

CustomCard.propTypes = {
  classes: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};

CustomCard.defaultProps = {
  image: ''
};

export default withStyles(styles)(CustomCard);
