/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  CheckboxRedux,
  SelectRedux,
  TextFieldRedux,
  SwitchRedux
} from 'components/Forms/ReduxFormMUI';
import {
  fetchAction,
  addAction,
  closeAction,
  submitAction,
  removeAction,
  editAction,
  closeNotifAction
} from 'actions/CrudTbFrmActions';
import { CrudTableForm, Notification } from 'components';
import {
  Paper,
  MenuItem,
  InputLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Input,
  Typography,
  Grid,
  FormHelperText
} from '@material-ui/core';

import { anchorTable, dataApi } from './sampleData';
import PortfolioSearch from './PortfolioSearch';


const branch = 'crudTbFrmPortfolio';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const styles = ({
  root: {
    flexGrow: 1,
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  }
});

class CrudTbFormPortfolio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataApi: [],
      loaded: false
    };
  }

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  componentWillMount(){
    setTimeout(() => {
      this.setState({
        loaded: true,
        dataApi: dataApi
      })
    }, 3000);
  }

  render() {
    const {
      classes,
      fetchData,
      addNew,
      closeForm,
      submit,
      removeRow,
      editRow,
      dataTable,
      openForm,
      initValues,
      closeNotif,
      messageNotif,
    } = this.props;

    const trueBool = true;

    if(this.state.loaded){
      return (
        <div>
          <Notification close={() => closeNotif(branch)} message={messageNotif} />
          <Paper className={classes.root}>
            <CrudTableForm
              dataTable={dataTable}
              openForm={openForm}
              dataInit={this.state.dataApi}
              anchor={anchorTable}
              title="Assets"
              fetchData={fetchData}
              addNew={addNew}
              closeForm={closeForm}
              submit={submit}
              removeRow={removeRow}
              editRow={editRow}
              branch={branch}
              initValues={initValues}
            >
              <div>
                <Field
                  name="asset"
                  component={PortfolioSearch}
                  required
                  ref={this.saveRef}
                  autoWidth={trueBool}
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="quantity"
                  component={TextFieldRedux}
                  placeholder="Quanity"
                  label="Quantity"
                  validate={required}
                  required
                  ref={this.saveRef}
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="purchase_value"
                  component={TextFieldRedux}
                  placeholder="Purchase Value"
                  label="Purchase Value"
                  required
                  validate={[required]}
                  className={classes.field}
                />
              </div>
            </CrudTableForm>
          </Paper>
        </div>
      );
    }else{
      return null
    }
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

CrudTbFormPortfolio.propTypes = {
  dataTable: PropTypes.object.isRequired,
  openForm: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  addNew: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  initValues: PropTypes.object.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  force: state, // force state from reducer
  initValues: state.getIn([branch, 'formValues']),
  dataTable: state.getIn([branch, 'dataTable']),
  openForm: state.getIn([branch, 'showFrm']),
  messageNotif: state.getIn([branch, 'notifMsg']),
});

const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
  addNew: bindActionCreators(addAction, dispatch),
  closeForm: bindActionCreators(closeAction, dispatch),
  submit: bindActionCreators(submitAction, dispatch),
  removeRow: bindActionCreators(removeAction, dispatch),
  editRow: bindActionCreators(editAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
});

const CrudTbFormPortfolioMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudTbFormPortfolio);

export default withStyles(styles)(CrudTbFormPortfolioMapped);
