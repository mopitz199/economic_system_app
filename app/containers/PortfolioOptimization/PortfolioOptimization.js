import React from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PapperBlock from '../../components/PapperBlock/PapperBlock';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar, Button, IconButton, SnackbarContent } from '@material-ui/core';
import ToolBar from './ToolBar';
import Assets from './Assets';
import CustomSnackBar from './SnackBar';
import messageStyles from 'ba-styles/Messages.scss';
import { server, headers } from '../../constants';
import {customFetch} from '../../httpUtils'

class PortfolioOptimization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      nameErrorMessage: '',

      searchResult: '',
      assetList: [],

      minDisposedToLose: 0,
      minDisposedToLoseErrorMessage: '',

      loadingSaving: false,
      loadingValidation: false,

      open: false,
      type: '',
      errorMessage: ''
    };
  }

  getAssetDataById(id) {
    let correctAssetData = null;
    let index = null;
    this.state.assetList.forEach((assetData, i) => {
      if (assetData.id == id) {
        correctAssetData = assetData;
        index = i;
      }
    });
    return [correctAssetData, index];
  }

  validateSumMin() {
    let sum = 0;
    this.state.assetList.forEach(assetData => {
      sum += parseFloat(assetData.min_to_invest);
    });
    if(sum <= 100){
      return true
    }else{
      this.setState({
        type: 'error',
        open: true,
        errorMessage: 'The total min prcentage should be <= 100',
        loadingValidation: false,
      });
      return false
    }
  }

  validateMinAssetOptimization = () => {
    if(this.state.assetList.length <= 0){
      this.setState({
        type: 'error',
        open: true,
        errorMessage: 'You must add at least 1 asset',
        loadingValidation: false,
      });
      return false
    }else{
      return true
    }
  }

  validateGlobalMin() {
    const floatNumberRegex = /^\d+(\.\d{1,2})?$/;
    if (!floatNumberRegex.test(this.state.minDisposedToLose)) {
      this.setState({ minDisposedToLoseErrorMessage: 'It must be a number' });
      return false;
    }
    if (this.state.minDisposedToLose < 0 || this.state.minDisposedToLose > 100) {
      this.setState({ minDisposedToLoseErrorMessage: 'It must be a number between 0 and 100' });
      return false;
    }
    this.setState({ minDisposedToLoseErrorMessage: '' });
    return true;
  }

  validateAssetMinMax() {
    let valid = true;
    const floatNumberRegex = /^\d+(\.\d{1,2})?$/;
    const assetList = this.state.assetList;
    assetList.forEach(assetData => {
      if (!floatNumberRegex.test(assetData.min_to_invest)) {
        assetData.minPercentageError = 'It must be a number';
        valid = false;
      } else if (assetData.min_to_invest < 0 || assetData.min_to_invest > 100) {
        assetData.minPercentageError = 'It must be a number between 0 and 100';
        valid = false;
      } else {
        assetData.minPercentageError = '';
      }

      if (!floatNumberRegex.test(assetData.max_to_invest)) {
        assetData.maxPercentageError = 'It must be a number';
        valid = false;
      } else if (assetData.max_to_invest < 0 || assetData.max_to_invest > 100) {
        assetData.maxPercentageError = 'It must be a number between 0 and 100';
      } else {
        assetData.maxPercentageError = '';
      }
    });
    this.setState({ assetList });
    return valid;
  }

  validateName = () => {
    if(this.state.name == ''){
      this.setState({
        nameErrorMessage: 'You must fill this field'
      })
      return false
    }
    return true
  }

  onSnackBarClose = () => {
    this.setState({ open: false });
  }

  cleanAssetOptimizationValidations = (assetList = null) => {
    if (!assetList) {
      assetList = this.state.assetList;
    }
    assetList.forEach(assetData => {
      assetData.percentageDistribution = null;
    });
    return assetList;
  }

  cleanAllErrorMessages = ({assetList = null, extraState = {}}) => {
    this.setState({
      assetList: this.cleanAssetOptimizationValidations(assetList),
      minDisposedToLoseErrorMessage: '',
      errorMessage: '',
      searchResult: '',
      nameErrorMessage: '',
      ...extraState
    });
  }

  processOptimization = () => {
    const assetList = this.state.assetList;
    setTimeout(() => {
      assetList.forEach(assetData => {
        assetData.percentageDistribution = 10;
      });
      this.setState({
        assetList,
        loadingValidation: false
      });
    }, 2000);
  }

  validate = () => {
    let valid = true
    valid = this.validateMinAssetOptimization()
    if(!valid) return false
    valid = this.validateName()
    if(!valid) return false
    valid = this.validateGlobalMin()
    if(!valid) return false
    valid = this.validateAssetMinMax()
    if(!valid) return false
    valid = this.validateSumMin()
    if(!valid) return false
    return valid
  }

  onValidateClick = () => {
    this.setState({ loadingValidation: true });
    if(this.validate()){
      this.processOptimization();
    }else{
      this.setState({ loadingValidation: false });
    }
  }

  onMinDisposedToLoseChange = (e) => {
    this.setState({ minDisposedToLose: e.target.value });
  }

  onSearchChange = (value) => {
    this.setState({ searchResult: value });
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  }

  onAddClick = () => {
    const assetList = this.state.assetList;
    if (this.state.searchResult) {
      const asset = JSON.parse(this.state.searchResult);
      const assetData = {};
      assetData.asset = asset;
      assetData.min_to_invest = 0;
      assetData.max_to_invest = 0;
      assetData.maxPercentageError = '';
      assetData.minPercentageError = '';
      assetList.push(assetData);
      this.cleanAllErrorMessages({assetList: assetList})
    }
  }

  processDataToSave = () => {
    const body = {
      asset_optimizations: [],
      min_disposed_to_lose: this.state.minDisposedToLose,
      name: this.state.name
    };
    this.state.assetList.forEach(assetOptmization => {
      body.asset_optimizations.push({
        id: assetOptmization.id,
        asset: assetOptmization.asset.id,
        min_to_invest: assetOptmization.min_to_invest,
        max_to_invest: assetOptmization.max_to_invest,
      });
    });
    return body;
  }

  onSaveClick = () => {
    this.setState({loadingSaving: true})
    if(this.validate()){
      const body = this.processDataToSave();
      let url = null
      if(this.state.id){
        url = `${server}/api/portfolio-optimization/${this.state.id}/`
      }else{
        url = `${server}/api/portfolio-optimization/`
      }

      customFetch({
        url: url,
        request: {
          method: 'POST',
          body: JSON.stringify(body),
          headers
        },
        onServerError: () => {
          this.setState({
            open: true,
            type: 'error',
            errorMessage: 'Server Error',
            loadingSaving: false,
          });
        },
        onSuccess: (data) => {
          this.cleanAllErrorMessages({
            extraState: {
              open: true,
              type: 'success',
              errorMessage: 'Your optimization has been created!',
              loadingSaving: false,
            }
          })
        },
        onError: (data) => {
          this.setState({
            open: true,
            type: 'error',
            errorMessage: data.detail,
            loadingSaving: false,
          });
        }
      })
    }else{
      this.setState({loadingSaving: false})
    }
  }

  onDeleteClick = (id) => {
    let assetList = this.state.assetList;
    assetList = assetList.filter(assetData => assetData.id != id);
    this.setState({ assetList });
  }

  onMinAssetChange = (e, id) => {
    const data = this.getAssetDataById(id);
    data[0].min_to_invest = e.target.value;
    const assetList = this.state.assetList;
    assetList[data[1]] = data[0];
    this.setState({ assetList });
  }

  onMaxAssetChange = (e, id) => {
    const data = this.getAssetDataById(id);
    data[0].max_to_invest = e.target.value;
    const assetList = this.state.assetList;
    assetList[data[1]] = data[0];
    this.setState({ assetList });
  }

  setInitData = (portfolioOptimization) => {
    const assetList = [];
    portfolioOptimization.assetoptimization_set.forEach(assetOptimization => {
      assetOptimization.maxPercentageError = '';
      assetOptimization.minPercentageError = '';
      assetList.push(assetOptimization);
    });
    this.setState({
      id: portfolioOptimization.id,
      name: portfolioOptimization.name,
      minDisposedToLose: portfolioOptimization.min_disposed_to_lose,
      assetList,
    });
  }

  componentWillMount() {
    const { portfolioOptimizationId } = this.props.match.params;

    if(portfolioOptimizationId){
      return fetch(
        `${server}/api/portfolio-optimization/${portfolioOptimizationId}/`,
        { headers }
      )
        .then(res => res.json())
        .then(res => res.results)
        .then(portfolioOptimization => {
          this.setInitData(portfolioOptimization);
        });
    }
  }

  render() {
    const title = 'PortfolioOptimization';
    const description = 'The section where you can track all the real time wealth of your portfolio';
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Portfolio Optimization" desc="The section where you can optimizate and simulate the performance of a possible portfolio">
          <CustomSnackBar
            type={this.state.type}
            message={this.state.errorMessage}
            onClose={this.onSnackBarClose}
            open={this.state.open}
          />
          <ToolBar
            name={this.state.name}
            nameErrorMessage={this.state.nameErrorMessage}
            onChangeName={this.onChangeName}
            searchValue={this.state.searchResult}
            onSearchChange={this.onSearchChange}
            onAddClick={this.onAddClick}
            onSaveClick={this.onSaveClick}
            onMinDisposedToLoseChange={this.onMinDisposedToLoseChange}
            minDisposedToLoseValue={this.state.minDisposedToLose}
            onValidateClick={this.onValidateClick}
            loadingValidation={this.state.loadingValidation}
            loadingSaving={this.state.loadingSaving}
            minDisposedToLoseErrorMessage={this.state.minDisposedToLoseErrorMessage}
          />
          <Assets
            assetList={this.state.assetList}
            onDeleteClick={this.onDeleteClick}
            onMinAssetChange={this.onMinAssetChange}
            onMaxAssetChange={this.onMaxAssetChange}
          />
        </PapperBlock>
      </div>
    );
  }
}

export default PortfolioOptimization;
