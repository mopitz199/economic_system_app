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
  closeNotifAction,
  errorNotifAction,
} from 'actions/CrudTbFrmActions';
import { CrudTableForm, Notification, CustomNotification } from 'components';
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
  FormHelperText,
  Snackbar
} from '@material-ui/core';

import { anchorTable } from './sampleData';
import PortfolioSearch from './PortfolioSearch';

import {server, headers} from '../../constants';


const branch = 'crudTbFrmPortfolio';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const floatNumber = value => {
  var regexp = /^\d+(\.\d{1,10})?$/;
  return value && regexp.test(value) ? undefined : 'Invalid number'
}

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
      loaded: false,

      openNotification: false,
      variant: null,
      message: null,
    };
  }

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  showCustomNotification = (variant, message) => {
    this.setState({
      variant,
      message,
      openNotification: true
    })
  }

  proccesFetch = (data) => {
    let finalData = []
    data.map((assetPortfolio) => {
      let asset = assetPortfolio.asset
      let performance = assetPortfolio.performance
      if(performance){
        performance = `${performance}%`
      }
      finalData.push({
        id: assetPortfolio.id,
        asset: JSON.stringify({
          "name": asset.name,
          "symbol": asset.symbol,
          "asset_type": asset.asset_type
        }),
        quantity: assetPortfolio.quantity,
        purchase_value: assetPortfolio.purchase_price,
        current_value: assetPortfolio.current_price,
        performance: performance,
      })
    })
    return finalData;
  }

  componentWillMount(){
    fetch(
      `${server}/api/asset/asset_portfolio/`,
      {headers}
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          loaded: true,
          dataApi: this.proccesFetch(res['results'])
        })
      })
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
      variant,
      errorNotifAction,
    } = this.props;

    const trueBool = true;

    if(this.state.loaded){
      return (
        <div>
          <Notification
            close={() => closeNotif(branch)}
            message={messageNotif}
            variant={variant}
          />
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
              submit={(data, reducerName) => {
                const id = data.get("id")
                const assetStr = data.get("asset")
                const assetJSON = JSON.parse(assetStr)
                const assetId = assetJSON.id
                const quantity = data.get("quantity")
                const purchaseValue = data.get("purchase_value")
                if(id){
                  // Update
                  submit(data, reducerName)
                }else{
                  let body = {
                    "asset": assetId,
                    "quantity": parseFloat(quantity),
                    "purchase_price": purchaseValue,
                  }
                  fetch(
                    `${server}/api/asset/asset_portfolio/`,
                    {
                      method: 'POST',
                      body: JSON.stringify(body),
                      headers
                    }
                  )
                    .then(res => {
                      if(res.status == 201){
                        data.message = "Asset created successfully"
                        submit(data, reducerName)
                      }else{
                        errorNotifAction(
                          "Error on asset creation",
                          reducerName
                        )
                      }
                    })
                }
              }}
              removeRow={(data, reducerName) => {
                const id = data.get('id')
                setTimeout(() => {
                  data.message = "Asset removed successfully"
                  removeRow(data, reducerName)
                }, 2000)
              }}
              editRow={(data, reducerName) => {
                editRow(data, reducerName)
              }}
              branch={branch}
              initValues={initValues}
            >
              <div>
                <Field
                  name="asset"
                  component={PortfolioSearch}
                  required
                  validate={[required]}
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
                  required
                  validate={[required, floatNumber]}
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
                  validate={[required, floatNumber]}
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

CrudTbFormPortfolio.propTypes = {
  dataTable: PropTypes.object.isRequired,
  openForm: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  addNew: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  errorNotifAction: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  initValues: PropTypes.object.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  force: state, // force state from reducer
  initValues: state.getIn([branch, 'formValues']),
  dataTable: state.getIn([branch, 'dataTable']),
  openForm: state.getIn([branch, 'showFrm']),
  messageNotif: state.getIn([branch, 'notifMsg']),
  variant: state.getIn([branch, 'variant']),
});

const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
  addNew: bindActionCreators(addAction, dispatch),
  closeForm: bindActionCreators(closeAction, dispatch),
  submit: bindActionCreators(submitAction, dispatch),
  removeRow: bindActionCreators(removeAction, dispatch),
  editRow: bindActionCreators(editAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
  errorNotifAction: bindActionCreators(errorNotifAction, dispatch),
});

const CrudTbFormPortfolioMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudTbFormPortfolio);

export default withStyles(styles)(CrudTbFormPortfolioMapped);
