import React from 'react';
import { Helmet } from 'react-helmet';
import PapperBlock from '../../components/PapperBlock/PapperBlock';
import { Typography, Box } from '@material-ui/core';
import ToolBar from './ToolBar';
import CustomSnackBar from './SnackBar';
import AssetList from './AssetList';
import InitLoading from './InitLoading';
import { server, headers } from '../../constants';
import { customFetch } from '../../httpUtils';

class PortfolioOptimization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      nameErrorMessage: '',
      
      initLoading: true,

      searchResult: '',
      assetList: [],

      totalToInvestValue: '',
      totalToInvestErrorMessage: '',

      minDisposedToLose: 0,
      minDisposedToLoseErrorMessage: '',

      optimism: 50,

      loadingSaving: false,
      loadingSimulation: false,

      open: false,
      type: '',
      errorMessage: '',

      showSimulationMode: false,
    };
  }

  getAssetDataByComponentId(id) {
    let correctAssetData = null;
    let index = null;
    this.state.assetList.forEach((assetData, i) => {
      if (assetData.componentId == id) {
        correctAssetData = assetData;
        index = i;
      }
    });
    return [correctAssetData, index];
  }

  validateTotalAmountToInvest() {
    let valid = true;
    this.state.assetList.forEach(assetData => {
      if (assetData.amountToInvest) {
        this.setState({
          totalToInvestErrorMessage: 'You must fill this field',
          loadingSimulation: false,
        });
        valid = false;
      }
    });
    return valid;
  }

  validateSumMin() {
    let sum = 0;
    this.state.assetList.forEach(assetData => {
      sum += parseFloat(assetData.min_to_invest);
    });
    if (sum <= 100) {
      return true;
    }
    this.setState({
      type: 'error',
      open: true,
      errorMessage: 'The total min prcentage should be <= 100',
      loadingSimulation: false,
    });
    return false;
  }

  validateMinAssetOptimization = () => {
    if (this.state.assetList.length <= 0) {
      this.setState({
        type: 'error',
        open: true,
        errorMessage: 'You must add at least 1 asset',
        loadingSimulation: false,
      });
      return false;
    }
    return true;
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
        valid = false;
      } else {
        assetData.maxPercentageError = '';
      }
    });
    this.setState({ assetList });
    return valid;
  }

  validateName = () => {
    if (this.state.name == '') {
      this.setState({
        nameErrorMessage: 'You must fill this field'
      });
      return false;
    }
    return true;
  }

  onSnackBarClose = () => {
    this.setState({ open: false });
  }

  cleanAssetOptimizationValidations = (assetList = null) => {
    if (!assetList) {
      assetList = this.state.assetList;
    }
    assetList.forEach(assetData => {
      assetData.amountToInvestResult = '';
      assetData.percentageToInvestResult = '';
    });
    return assetList;
  }

  cleanAllErrorMessages = ({ assetList = null, extraState = {} }) => {
    this.setState({
      assetList: this.cleanAssetOptimizationValidations(assetList),
      minDisposedToLoseErrorMessage: '',
      totalToInvestErrorMessage: '',
      errorMessage: '',
      searchResult: '',
      nameErrorMessage: '',
      ...extraState
    });
  }

  processOptimization = () => {
    this.cleanAllErrorMessages({
      extraState: {
        loadingSimulation: true,
      }
    });
    this.setState({ loadingSimulation: true });

    const body = {
      optimism: this.state.optimism,
      min_disposed_to_lose: this.state.minDisposedToLose,
      asset_optimizations: []
    };
    if (this.state.totalToInvestValue) {
      body.total_amount_to_invest = this.state.totalToInvestValue;
    }
    this.state.assetList.forEach(assetData => {
      const assetBody = {
        asset_id: assetData.asset.id,
        min_to_invest: assetData.min_to_invest,
        max_to_invest: assetData.max_to_invest,
      };
      if (assetData.amount_to_invest) {
        assetBody.amount_to_invest = assetData.amount_to_invest;
      }
      body.asset_optimizations.push(assetBody);
    });

    if (this.validate()) {
      customFetch({
        url: `${server}/api/generate-optimization/`,
        request: {
          method: 'POST',
          body: JSON.stringify(body),
          headers
        },
        onServerError: (data) => {
          let message = 'Server Error';
          if (data.results.detail) {
            message = data.results.detail;
          }
          this.setState({
            open: true,
            type: 'error',
            errorMessage: message,
            loadingSimulation: false,
          });
        },
        onSuccess: (data) => {
          const assetList = [];
          this.state.assetList.forEach((assetData) => {
            const values = data.results[assetData.asset.id];
            assetData.percentageToInvestResult = values.percentage;
            if (values.amount) {
              assetData.amountToInvestResult = values.amount;
            }
            assetList.push(assetData);
          });
          this.setState({
            assetList,
            open: true,
            type: 'success',
            errorMessage: 'Your optimization has been simulated',
            loadingSimulation: false,
          });
        },
        onError: (data) => {
          this.setState({
            open: true,
            type: 'error',
            errorMessage: data.detail,
            loadingSimulation: false,
          });
        }
      });
    }
  }

  cleanSimulationResults = () => {
    const assetList = this.state.assetList;
    assetList.forEach(assetData => {
      assetData.amountToInvestResult = '';
      assetData.percentageToInvestResult = '';
    });
    return assetList;
  }

  validate = () => {
    let valid = true;
    valid = this.validateTotalAmountToInvest();
    if (!valid) return false;
    valid = this.validateMinAssetOptimization();
    if (!valid) return false;
    valid = this.validateName();
    if (!valid) return false;
    valid = this.validateGlobalMin();
    if (!valid) return false;
    valid = this.validateAssetMinMax();
    if (!valid) return false;
    valid = this.validateSumMin();
    if (!valid) return false;
    return valid;
  }

  onSimulateClick = () => {
    this.setState({ loadingSimulation: true });
    if (this.validate()) {
      this.processOptimization();
    } else {
      this.setState({ loadingSimulation: false });
    }
  }

  onMinDisposedToLoseChange = (e) => {
    this.setState({ minDisposedToLose: e.target.value });
  }

  onTotalToInvestChange = (e) => {
    this.setState({ totalToInvestValue: e.target.value });
  }

  onOptimismChange = (value) => {
    this.setState({ optimism: value });
  }

  onSearchChange = (value) => {
    this.setState({ searchResult: value });
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  }

  onCellNameClick = (asset_id) => {
    const assetUrl = `${window.location.origin}/app/asset/${asset_id}`;
    window.open(assetUrl, '_blank');
  }

  onSwitchModeClick = () => {
    this.setState({
      showSimulationMode: !this.state.showSimulationMode,
      assetList: this.cleanSimulationResults()
    });
  }

  onAddClick = () => {
    const assetList = this.state.assetList;
    if (this.state.searchResult) {
      const asset = JSON.parse(this.state.searchResult);
      const assetData = {};
      assetData.componentId = assetList.length;
      assetData.asset = asset;
      assetData.min_to_invest = 0;
      assetData.max_to_invest = 0;
      assetData.maxPercentageError = '';
      assetData.minPercentageError = '';

      assetData.amountToInvest = '';
      assetData.amountToInvestError = '';
      assetData.amountToInvestResult = '';
      assetData.percentageToInvestResult = '';

      assetList.unshift(assetData);
      this.cleanAllErrorMessages({ assetList });
    }
  }

  processDataToSave = () => {
    const body = {
      asset_optimizations: [],
      min_disposed_to_lose: this.state.minDisposedToLose,
      name: this.state.name,
      optimism: this.state.optimism,
    };

    if (this.state.totalToInvestValue) {
      body.total_amount_to_invest = this.state.totalToInvestValue;
    }

    this.state.assetList.forEach(assetOptmization => {
      const assetOptimizationBody = {
        id: assetOptmization.id,
        asset: assetOptmization.asset.id,
        min_to_invest: assetOptmization.min_to_invest,
        max_to_invest: assetOptmization.max_to_invest,
      };

      if (assetOptmization.amount_to_invest) {
        assetOptimizationBody.amount_to_invest = assetOptmization.amount_to_invest;
      }

      body.asset_optimizations.push(assetOptimizationBody);
    });
    return body;
  }

  onSaveClick = () => {
    this.setState({ loadingSaving: true });
    if (this.validate()) {
      const body = this.processDataToSave();
      let url = null;
      if (this.state.id) {
        url = `${server}/api/portfolio-optimization/${this.state.id}/`;
      } else {
        url = `${server}/api/portfolio-optimization/`;
      }

      customFetch({
        url,
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
          });
        },
        onError: (data) => {
          this.setState({
            open: true,
            type: 'error',
            errorMessage: data.detail,
            loadingSaving: false,
          });
        }
      });
    } else {
      this.setState({ loadingSaving: false });
    }
  }

  onDeleteClick = (id) => {
    let assetList = this.state.assetList;
    assetList = assetList.filter(assetData => assetData.id != id);
    assetList.forEach((assetData, index) => {
      assetData.componentId = index;
    });
    this.setState({ assetList });
  }

  onMinAssetChange = (e, id) => {
    const data = this.getAssetDataByComponentId(id);
    data[0].min_to_invest = e.target.value;
    const assetList = this.state.assetList;
    assetList[data[1]] = data[0];
    this.setState({ assetList });
  }

  onMaxAssetChange = (e, id) => {
    const data = this.getAssetDataByComponentId(id);
    data[0].max_to_invest = e.target.value;
    const assetList = this.state.assetList;
    assetList[data[1]] = data[0];
    this.setState({ assetList });
  }

  onAmountToInvestChange = (e, id) => {
    const data = this.getAssetDataByComponentId(id);
    data[0].amount_to_invest = e.target.value;
    const assetList = this.state.assetList;
    assetList[data[1]] = data[0];
    this.setState({ assetList });
  }

  setInitData = (portfolioOptimization) => {
    const assetList = [];
    portfolioOptimization.assetoptimization_set.forEach((assetOptimization, index) => {
      assetOptimization.componentId = index;
      assetOptimization.maxPercentageError = '';
      assetOptimization.minPercentageError = '';

      if (assetOptimization.amount_to_invest == null) {
        assetOptimization.amount_to_invest = '';
      }

      assetOptimization.amountToInvestError = '';

      assetOptimization.amountToInvestResult = '';
      assetOptimization.percentageToInvestResult = '';
      assetList.push(assetOptimization);
    });
    this.setState({
      initLoading: false,
      id: portfolioOptimization.id,
      name: portfolioOptimization.name,
      optimism: portfolioOptimization.optimism,
      minDisposedToLose: portfolioOptimization.min_disposed_to_lose,
      totalToInvestValue: portfolioOptimization.total_amount_to_invest,
      assetList,
    });
  }

  componentWillMount() {
    const { portfolioOptimizationId } = this.props.match.params;

    if (portfolioOptimizationId) {
      return fetch(
        `${server}/api/portfolio-optimization/${portfolioOptimizationId}/`,
        { headers }
      )
        .then(res => res.json())
        .then(res => res.results)
        .then(portfolioOptimization => {
          this.setInitData(portfolioOptimization);
        });
    }else{
      return fetch(
        `${server}/api/portfolio-optimization/`,
        { headers }
      )
        .then(res => res.json())
        .then(res => res.results)
        .then(portfolioOptimization => {
          this.setInitData(portfolioOptimization);
        });
    }
  }

  mainComponent(){
    return (
      <Box>
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
          onMinDisposedToLoseChange={this.onMinDisposedToLoseChange}
          minDisposedToLoseValue={this.state.minDisposedToLose}

          onOptimismChange={this.onOptimismChange}
          optimism={this.state.optimism}

          onSimulateClick={this.onSimulateClick}
          loadingSimulation={this.state.loadingSimulation}

          totalToInvestValue={this.state.totalToInvestValue}
          totalToInvestErrorMessage={this.state.totalToInvestErrorMessage}
          onTotalToInvestChange={this.onTotalToInvestChange}

          onSaveClick={this.onSaveClick}
          loadingSaving={this.state.loadingSaving}

          onSwitchModeClick={this.onSwitchModeClick}

          minDisposedToLoseErrorMessage={this.state.minDisposedToLoseErrorMessage}
          showSimulationMode={this.state.showSimulationMode}
        />
        {this.state.assetList.length > 0 ?
          <AssetList
            assetList={this.state.assetList}
            onDeleteClick={this.onDeleteClick}
            onMinAssetChange={this.onMinAssetChange}
            onMaxAssetChange={this.onMaxAssetChange}
            onAmountToInvestChange={this.onAmountToInvestChange}
            onCellNameClick={this.onCellNameClick}
            showSimulationMode={this.state.showSimulationMode}
          />
          :
          <Box display="flex" justifyContent="center">
            <Typography variant="h4" gutterBottom>
              Your list is empty :(
            </Typography>
          </Box>
        }
      </Box>
    )
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
          {this.state.initLoading ? <InitLoading /> : this.mainComponent()}
        </PapperBlock>
      </div>
    );
  }
}

export default PortfolioOptimization;
