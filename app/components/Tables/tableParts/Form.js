import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import css from 'ba-styles/Form.scss';
import { Button } from '@material-ui/core';

class Form extends Component {
  componentDidMount() {
    // this.ref // the Field
    //   .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    //   .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    //   .focus() // on TextField
    // console.log(this.props.initValues);
  }

  render() {
    const {
      handleSubmit,
      children,
      reset,
      pristine,
      submitting,
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            {children}
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

Form.propTypes = {
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const FormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(Form);


const FormMappedInit = connect(
  state => ({
    initialValues: state.getIn(['crudTableForm', 'formValues'])
  })
)(FormMapped);


export default FormMappedInit;
