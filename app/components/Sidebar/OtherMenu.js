import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import OtherMenuContent from 'ba-api/otherMenu';
import { ListItem, ListItemText } from '@material-ui/core';
import styles from './sidebar-jss';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

class OtherMenu extends React.Component { // eslint-disable-line
  render() {
    const { toggleDrawerOpen, classes } = this.props;
    const getOtherMenu = menuArray => menuArray.map((item, index) => {
      const keyIndex = index.toString();
      return (
        <div key={keyIndex}>
          <ListItem
            button
            component={LinkBtn}
            to={item.link}
            activeClassName={classes.active}
            onClick={toggleDrawerOpen}
          >
            <ListItemText secondary={item.name} />
          </ListItem>
        </div>
      );
    });

    return (
      <div>
        {getOtherMenu(OtherMenuContent)}
      </div>
    );
  }
}

OtherMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(OtherMenu);
