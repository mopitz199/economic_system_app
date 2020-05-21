/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  TextFieldRedux,
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
import { CrudTableForm, Notification } from 'components';
import { Paper } from '@material-ui/core';

import PortfolioSearch from './PortfolioSearch';
import { anchorTable } from './PortfolioColumns';
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
  },
});


class PortfolioTable extends Component {

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
      let earnings = assetPortfolio.earnings
      finalData.push({
        id: assetPortfolio.id,
        asset: JSON.stringify({
          "id": asset.id,
          "name": asset.name,
          "symbol": asset.symbol,
          "asset_type": asset.asset_type
        }),
        quantity: assetPortfolio.quantity,
        purchase_value: assetPortfolio.purchase_price,
        current_value: assetPortfolio.current_price,
        performance: performance,
        earnings: earnings,
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

  getAssetJSON(data){
    const assetStr = data.get("asset")
    const assetJSON = JSON.parse(assetStr)
    return assetJSON
  }

  createAssetPortfolio(
    data,
    submit,
    reducerName
  ){
    const assetJSON = this.getAssetJSON(data)

    let body = {
      "asset": assetJSON.id,
      "quantity":  parseFloat(data.get("quantity")),
      "purchase_price": data.get("purchase_value"),
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
          return res.json()
        }else{
          return null
        }
      })
      .then(res => {
        if(res){
          data = data.set("id", res.id)
          data = data.set("current_value", res.current_price)
          data = data.set("performance", res.performance)
          data = data.set("message", "Asset created successfully")
          submit(data, reducerName)
        }else{
          errorNotifAction(
            "Error on asset creation",
            reducerName
          )
        }
      })
  }

  updateAssetPortfolio(
    data,
    submit,
    reducerName
  ){
    const assetJSON = this.getAssetJSON(data)

    let body = {
      "asset": assetJSON.id,
      "quantity": parseFloat(data.get("quantity")),
      "purchase_price": data.get("purchase_value"),
    }
    fetch(
      `${server}/api/asset/asset_portfolio/${data.get("id")}/`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers
      }
    )
      .then(res => {
        if(res.status == 200){
          return res.json()
        }else{
          return null
        }
      })
      .then(res => {
        if(res){
          data = data.set("current_value", res.current_price)
          data = data.set("performance", res.performance)
          data = data.set('message', "Asset updated successfully")
          submit(data, reducerName)
        }else{
          errorNotifAction(
            "Error on asset updating",
            reducerName
          )
        }
      })
  }

  deleteAssetPortfolio(data, removeRow, reducerName){
    const id = data.get('id')
    fetch(
      `${server}/api/asset/asset_portfolio/${id}`,
      {
        method: 'DELETE',
        headers
      }
    )
      .then(res => {
        if(res.status == 204){
          data = data.set('message', "Asset has been removed")
          removeRow(data, reducerName)    
        }else{
          errorNotifAction(
            "Error on asset delete",
            reducerName
          )
        }
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
                if(data.get("id")){
                  this.updateAssetPortfolio(data, submit, reducerName)
                }else{
                  this.createAssetPortfolio(data, submit, reducerName)
                }
              }}
              removeRow={(data, reducerName) => {
                this.deleteAssetPortfolio(data, removeRow, reducerName)
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

PortfolioTable.propTypes = {
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

const PortfolioTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioTable);

export default withStyles(styles)(PortfolioTableMapped);
