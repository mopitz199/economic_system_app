import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { saveUserAction } from 'actions/UserActions';
import { bindActionCreators } from 'redux';
import Type from 'ba-styles/Typography.scss';
import ArrowForward from '@material-ui/icons/ArrowForward';
import brand from 'ba-api/brand';
import logo from 'ba-images/logo.svg';
import { RegisterForm } from 'ba-components';
import styles from 'ba-components/Forms/user-jss';
import { Grid, Hidden, Typography } from '@material-ui/core';

import PapperBlock from '../../../components/PapperBlock/PapperBlock';
import { server, headers } from '../../../constants';
import { customFetch } from '../../../httpUtils';


class Login extends React.Component {
  state = {
    valueForm: [],
    registered: false,
  }

  componentWillMount(){
    const token = localStorage.getItem('token')
    if(token){
      window.location.href = '/app';
    }
  }

  mapFields(error_obj){
    let mapped_obj = {}
    for (const property in error_obj) {
      if(property=='username'){
        mapped_obj.name = error_obj[property]
      }else if(property=='repeated_password'){
        mapped_obj.passwordConfirm = error_obj[property]
      }else if(property=='non_field_errors'){
        mapped_obj._error = error_obj[property]
      }else{
        mapped_obj[property] = error_obj[property]
      }
    }
    return mapped_obj
  }

  submitForm(values) {
    const data = values.toJSON()
    const body = {
      'password': data.password,
      'repeated_password': data.passwordConfirm,
      'email': data.email
    }
    const url = `${server}/api/user/create-user/`
    const request = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    }
    
    return customFetch({
      url: `${server}/api/user/create-user/`,
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
        localStorage.setItem('token', data.results.token);
        this.setState({registered: true})
        this.props.saveUserAction(data.results)
      },
      onError: (data) => {
        const errors = this.mapFields(data)
        throw new SubmissionError(errors)
      }
    });
    // this.setState({ valueForm: values });
  }

  renderRegistered = () => {
    const { classes } = this.props;
    return (
      <Grid container spacing={3} alignItems="center" direction="row" justify="center">
        <Grid item md={4} xs={11}>
          <PapperBlock whiteBg title="Done!" desc="">
            <Typography variant="h6">Now you can start your investments!</Typography>
            <a href="/app">Let's go!</a>
          </PapperBlock>
        </Grid>
      </Grid>
    )
  }

  renderRegister = () => {
    const { classes } = this.props;
    return (
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
                  <Typography variant="h4">
                    <span className={Type.light}>Nice to meet You :)</span>
                  </Typography>
                </div>
                <ArrowForward className={classes.decoBottom} />
              </div>
            </Grid>
          </Hidden>
          <Grid item md={6} sm={8} xs={11}>
            {/* ----------------------------------------------------------------------*/}
            {/* Load Register Form */}
            <RegisterForm onSubmit={(values) => this.submitForm(values)} />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  render() {
    const title = brand.name + ' - Register';
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
          {this.state.registered
            ? this.renderRegistered()
            : this.renderRegister()
          }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  saveUserAction: bindActionCreators(saveUserAction, dispatch),
})

const LoginMapped = connect(
  null,
  mapDispatchToProps
)(Login);

export default withStyles(styles)(LoginMapped);
