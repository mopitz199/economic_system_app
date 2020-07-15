import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'ba-api/brand';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form'
import { withStyles } from '@material-ui/core/styles';
import Type from 'ba-styles/Typography.scss';
import ArrowForward from '@material-ui/icons/ArrowForward';
import logo from 'ba-images/logo.svg';
import { LoginForm } from 'ba-components';
import styles from 'ba-components/Forms/user-jss';
import { Grid, Hidden, Typography } from '@material-ui/core';

import { server, headers } from '../../../constants';
import { customFetch } from '../../../httpUtils';

class Login extends React.Component {
  state = {
    valueForm: [],
    hasToken: false
  }

  componentWillMount(){
    const token = localStorage.getItem('token')
    if(token){
      window.location.href = '/app';
    }else{
      this.setState({hasToken: true})
    }
  }

  submitForm(values) {
    const jsonData = values.toJSON()
    const body = {
      'username': jsonData.email,
      'password': jsonData.password
    }
    return customFetch({
      url: `${server}/api/user/get-token/`,
      request: {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
      },
      onServerError: (data) => {
        throw new SubmissionError({
          _error: 'Server error'
        })
      },
      onSuccess: (data) => {
        if(data.results){
          localStorage.setItem('token', data.results);
          window.location.href = '/app';
        }else{
          throw new SubmissionError({
            _error: 'Username or password incorrect'
          })
        }
        /*this.setState({registered: true})
        this.props.saveUserAction(data.results)*/
      },
      onError: (data) => {
        debugger
        //throw new SubmissionError(errors)
      }
    });

    /*
    setTimeout(() => {
      this.setState({ valueForm: values });
      console.log(`You submitted:\n\n${this.state.valueForm}`);
      window.location.href = '/app';
    }, 500); // simulate server latency
    */
  }

  render() {
    const title = brand.name + ' - Login';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <Grid container spacing={3} alignItems="center" direction="row" justify="center">
            <Grid item container justify="center" spacing={0} className={classes.loginWrap}>
              <Hidden smDown>
                <Grid item md={6} className={classes.welcomeWrap}>
                  {/* Welcome Login */}
                  <div className={classes.welcome}>
                    <div className={classes.welcomeContent}>
                      <div className={classes.brand}>
                        <img src={logo} alt={brand.name} />
                        <h3>{brand.name}</h3>
                      </div>
                      <Typography variant="h3">
                        <span className={Type.light}>Heldfsdlo thereee,</span>
                      </Typography>
                      <Typography variant="h6" className={classes.brandText}>
                        <span className={Type.regular}>
                          welcome to
                          {' '}
                          {brand.name}
                        </span>
                      </Typography>
                    </div>
                    <ArrowForward className={classes.decoBottom} />
                  </div>
                </Grid>
              </Hidden>
              <Grid item md={6} sm={8} xs={11}>
                {/* ----------------------------------------------------------------------*/}
                {/* Load Login Form */}
                <LoginForm onSubmit={(values) => this.submitForm(values)} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
