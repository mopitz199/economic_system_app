import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import css from 'ba-styles/Form.scss';
import { Button, Radio, RadioGroup, FormLabel, FormControlLabel } from '@material-ui/core';
import { TextFieldRedux } from '../Forms/ReduxFormMUI';
import styles from './calendar-jss';


// validation functions
const required = value => (value == null ? 'Required' : undefined);

const DateTimePickerRow = props => {
  const {
    showErrorsInline,
    dispatch,
    input: { onChange, value },
    meta: { touched, error },
    ...other
  } = props;

  const showError = showErrorsInline || touched;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        error={!!(showError && error)}
        helperText={showError && error}
        value={value || new Date()}
        onChange={onChange}
        disablePast
        label="DateTimePicker"
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

DateTimePickerRow.propTypes = {
  showErrorsInline: PropTypes.bool,
  dispatch: PropTypes.func,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

DateTimePickerRow.defaultProps = {
  showErrorsInline: false,
  dispatch: () => {},
};

class AddEventForm extends React.Component {
  state = {
    selectedDate: new Date(),
  }

  onChangeDate = date => {
    this.setState({ selectedDate: date });
  }

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      handleSubmit,
    } = this.props;
    const { selectedDate } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div>
              <Field
                name="title"
                component={TextFieldRedux}
                placeholder="Event Name"
                label="Event Name"
                validate={required}
                required
                ref={this.saveRef}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="start"
                component={DateTimePickerRow}
                placeholder="Start Date"
                value={selectedDate}
                onChange={this.onChangeDate}
                label="Start Date"
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="end"
                component={DateTimePickerRow}
                placeholder="End Date"
                value={selectedDate}
                onChange={this.onChangeDate}
                label="End Date"
                className={classes.field}
              />
            </div>
            <div className={classes.fieldBasic}>
              <FormLabel component="label">Label Color</FormLabel>
              <Field name="hexColor" className={classes.inlineWrap} component={renderRadioGroup}>
                <FormControlLabel value="F8BBD0" control={<Radio className={classes.redRadio} classes={{ root: classes.redRadio, checked: classes.checked }} />} label="Red" />
                <FormControlLabel value="C8E6C9" control={<Radio className={classes.greenRadio} classes={{ root: classes.greenRadio, checked: classes.checked }} />} label="Green" />
                <FormControlLabel value="B3E5FC" control={<Radio className={classes.blueRadio} classes={{ root: classes.blueRadio, checked: classes.checked }} />} label="Blue" />
                <FormControlLabel value="D1C4E9" control={<Radio className={classes.violetRadio} classes={{ root: classes.violetRadio, checked: classes.checked }} />} label="Violet" />
                <FormControlLabel value="FFECB3" control={<Radio className={classes.orangeRadio} classes={{ root: classes.orangeRadio, checked: classes.checked }} />} label="Orange" />
              </Field>
            </div>
          </section>
          <div className={css.buttonArea}>
            <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
              Submit
            </Button>
            <Button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

AddEventForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const AddEventFormRedux = reduxForm({
  form: 'immutableAddCalendar',
  enableReinitialize: true,
})(AddEventForm);

const reducer = 'calendar';
const AddEventInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, 'formValues'])
  }),
)(AddEventFormRedux);

export default withStyles(styles)(AddEventInit);
