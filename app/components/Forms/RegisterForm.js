import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form/immutable';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Brightness5 from '@material-ui/icons/Brightness5';
import People from '@material-ui/icons/People';
import { Button, FormControlLabel, Tabs, Tab } from '@material-ui/core';
import styles from './user-jss';
import { CheckboxRedux, TextFieldWithErrorRedux, TextFieldRedux } from './ReduxFormMUI';
import PapperBlock from '../PapperBlock/PapperBlock';


// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const passwordsMatch = (value, allValues) => {
  console.log(value, allValues.get('password'));
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

class RegisterForm extends React.Component {
  state = {
    tab: 0,
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const {
      error,
      classes,
      handleSubmit,
      pristine,
      submitting
    } = this.props;
    const { tab } = this.state;
    return (
      <div className={classes.formWrap}>
        <PapperBlock whiteBg title="Create New Account" desc="">
          <Tabs
            value={this.state.tab}
            onChange={this.handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
            className={classes.tab}
          >
            <Tab label="With Email" />
          </Tabs>
          {tab === 0
            && (
              <form onSubmit={handleSubmit}>
                {error && <strong>{error}</strong>}
                <div>
                  <Field
                    name="name"
                    formControlClassName={classes.formControl}
                    component={TextFieldWithErrorRedux}
                    placeholder="Username"
                    label="Username"
                    required
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="email"
                    formControlClassName={classes.formControl}
                    component={TextFieldWithErrorRedux}
                    placeholder="Your Email"
                    label="Your Email"
                    required
                    validate={[required, email]}
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    formControlClassName={classes.formControl}
                    component={TextFieldWithErrorRedux}
                    type="password"
                    label="Your Password"
                    required
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="passwordConfirm"
                    component={TextFieldWithErrorRedux}
                    type="password"
                    label="Re-type Password"
                    required
                    error
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                  />
                </div>
                <div className={classNames(classes.btnArea, classes.noMargin)}>
                  <div className={classes.optArea}>
                    <FormControlLabel control={<Field name="checkbox" component={CheckboxRedux} className={classes.agree} />} label="Agree with" />
                    <a href="#" className={classes.link}>Terms &amp; Condition</a>
                  </div>
                  <Button variant="contained" color="primary" type="submit">
                  Continue
                    <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                  </Button>
                </div>
              </form>
            )
          }
          {tab === 1
            && (
              <div>
                <Button fullWidth variant="contained" size="large" className={classNames(classes.redBtn, classes.socMedFull)} type="button">
                  <AllInclusive className={classNames(classes.leftIcon, classes.iconSmall)} />
                Socmed 1
                </Button>
                <Button fullWidth variant="contained" size="large" className={classNames(classes.blueBtn, classes.socMedFull)} type="button">
                  <Brightness5 className={classNames(classes.leftIcon, classes.iconSmall)} />
                Socmed 2
                </Button>
                <Button fullWidth variant="contained" size="large" className={classes.cyanBtn} type="button">
                  <People className={classNames(classes.leftIcon, classes.iconSmall)} />
                Socmed 3
                </Button>
              </div>
            )
          }
        </PapperBlock>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const RegisterFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(RegisterForm);

export default withStyles(styles)(RegisterFormReduxed);
