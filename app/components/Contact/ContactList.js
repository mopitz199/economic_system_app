import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import Star from '@material-ui/icons/Star';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import styles from './contact-jss';


class ContactList extends React.Component {
  state = {
    filter: 'all',
  };

  handleChange = (event, value) => {
    this.setState({ filter: value });
  };

  render() {
    const {
      classes,
      dataContact,
      itemSelected,
      showDetail,
      search,
      keyword,
      clippedRight
    } = this.props;
    const { filter } = this.state;
    const favoriteData = dataContact.filter(item => item.get('favorited') === true);
    const getItem = dataArray => dataArray.map(data => {
      const index = dataContact.indexOf(data);
      if (data.get('name').toLowerCase().indexOf(keyword) === -1) {
        return false;
      }
      return (
        <ListItem
          button
          key={data.get('id')}
          className={index === itemSelected ? classes.selected : ''}
          onClick={() => showDetail(data)}
        >
          <ListItemAvatar>
            <Avatar alt={data.get('name')} src={data.get('avatar')} className={classes.avatar} />
          </ListItemAvatar>
          <ListItemText primary={data.get('name')} secondary={data.get('title')} />
        </ListItem>
      );
    });
    return (
      <Fragment>
        <Drawer
          variant="permanent"
          anchor="left"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div>
            <div className={classNames(classes.toolbar, clippedRight && classes.clippedRight)}>
              <div className={classes.flex}>
                <div className={classes.searchWrapper}>
                  <div className={classes.search}>
                    <SearchIcon />
                  </div>
                  <input className={classes.input} onChange={(event) => search(event)} placeholder="Search Contact" />
                </div>
              </div>
            </div>
            <Divider />
            <List>
              {filter === 'all' ? getItem(dataContact) : getItem(favoriteData)}
            </List>
          </div>
        </Drawer>
        <BottomNavigation value={filter} onChange={this.handleChange} className={classes.bottomFilter}>
          <BottomNavigationAction label="All" value="all" icon={<PermContactCalendar />} />
          <BottomNavigationAction label="Favorites" value="favorites" icon={<Star />} />
        </BottomNavigation>
      </Fragment>
    );
  }
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
  dataContact: PropTypes.object.isRequired,
  keyword: PropTypes.string.isRequired,
  itemSelected: PropTypes.number.isRequired,
  showDetail: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  clippedRight: PropTypes.bool,
};

ContactList.defaultProps = {
  clippedRight: false
};

export default withStyles(styles)(ContactList);
