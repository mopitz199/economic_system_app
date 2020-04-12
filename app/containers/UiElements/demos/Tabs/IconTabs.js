import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { Paper, Grid, Tabs, Tab, Typography } from '@material-ui/core';

export default class IconTabs extends React.Component {
  state = {
    value: 0,
    value2: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChange2 = (event, value2) => {
    this.setState({ value2 });
  };

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography variant="button" gutterBottom>Without Text</Typography>
            <Paper>
              <Tabs
                value={this.state.value2}
                onChange={this.handleChange2}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab icon={<PhoneIcon />} />
                <Tab icon={<FavoriteIcon />} />
                <Tab icon={<PersonPinIcon />} />
              </Tabs>
            </Paper>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="button" gutterBottom>With Text</Typography>
            <Paper>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab icon={<PhoneIcon />} label="RECENTS" />
                <Tab icon={<FavoriteIcon />} label="FAVORITES" />
                <Tab icon={<PersonPinIcon />} label="NEARBY" />
              </Tabs>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
