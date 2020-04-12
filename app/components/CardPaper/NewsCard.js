import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardActions, CardContent, Button } from '@material-ui/core';
import styles from './cardStyle-jss';


class NewsCard extends React.Component {
  render() {
    const {
      classes,
      children,
      title,
      image,
    } = this.props;
    return (
      <Card className={classes.cardMedia}>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent>
          {children}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

NewsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default withStyles(styles)(NewsCard);
