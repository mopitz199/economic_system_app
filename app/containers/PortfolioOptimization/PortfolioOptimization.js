import React from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PapperBlock from '../../components/PapperBlock/PapperBlock';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar, Button, IconButton, SnackbarContent  } from '@material-ui/core';
import ToolBar from './ToolBar';
import Assets from './Assets';
import CustomSnackBar from './SnackBar';
import messageStyles from 'ba-styles/Messages.scss';


class PortfolioOptimization extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResult: "",
      assetList: [],

      minDisposedToLose: 0,
      minDisposedToLoseErrorMessage: "",
      
      loadingValidation: false,

      open: false,
      errorMessage: ""
    };
  }

  getAssetDataById(id){
    let correctAssetData = null
    let index = null
    this.state.assetList.forEach((assetData, i) => {
      if(assetData.id==id){
        correctAssetData=assetData
        index=i
      }
    })
    return [correctAssetData, index]
  }

  validateSumMin(){
    let sum = 0
    this.state.assetList.forEach(assetData => {
      sum += parseFloat(assetData.minPercentage)
    })
    return sum <= 100
  }

  validateGlobalMin(){
    var floatNumberRegex = /^\d+(\.\d{1,2})?$/;
    if(!floatNumberRegex.test(this.state.minDisposedToLose)){
      this.setState({minDisposedToLoseErrorMessage: 'It must be a number'})
      return false
    }
    if(this.state.minDisposedToLose < 0 || this.state.minDisposedToLose > 100){
      this.setState({minDisposedToLoseErrorMessage: 'It must be a number between 0 and 100'})
      return false
    }
    this.setState({minDisposedToLoseErrorMessage: ''})
    return true
  }

  validateAssetMinMax(){
    let valid = true
    var floatNumberRegex = /^\d+(\.\d{1,2})?$/;
    let assetList = this.state.assetList
    assetList.forEach(assetData => {
      if(!floatNumberRegex.test(assetData.minPercentage)){
        assetData.minPercentageError = 'It must be a number'
        valid = false
      }
      else if(assetData.minPercentage < 0 || assetData.minPercentage > 100){
        assetData.minPercentageError = 'It must be a number between 0 and 100'
        valid = false
      }else{
        assetData.minPercentageError = ""
      }

      if(!floatNumberRegex.test(assetData.maxPercentage)){
        assetData.maxPercentageError = 'It must be a number'
        valid = false
      }
      else if(assetData.maxPercentage < 0 || assetData.maxPercentage > 100){
        assetData.maxPercentageError = 'It must be a number between 0 and 100'
      }else{
        assetData.maxPercentageError = ""
      }
    })
    this.setState({assetList: assetList})
    return valid
  }

  onSnackBarClose = () => {
    this.setState({open: false})
  }


  cleanValidationProcess = (assetList=null) => {
    if(!assetList){
      assetList = this.state.assetList  
    }
    assetList.forEach(assetData => {
      assetData.percentageDistribution = null
    })
    return assetList
  }

  processOptimization = () => {
    let assetList = this.state.assetList
    setTimeout(() => {
      assetList.forEach(assetData => {
        assetData.percentageDistribution = 10
      })
      this.setState({
        assetList: assetList,
        loadingValidation: false
      })
    }, 2000)
  }

  onValidateClick = () => {
    this.setState({loadingValidation: true})
    if(this.validateGlobalMin()){
      if(this.validateAssetMinMax()){
        if(!this.validateSumMin()){
          this.setState({
            open: true,
            errorMessage: "The total min prcentage should be <= 100",
            loadingValidation: false,
          })
        }else{
          this.processOptimization()
        }
      }else{
        this.setState({loadingValidation: false})  
      }
    }else{
      this.setState({loadingValidation: false})
    }
  }

  onMinDisposedToLoseChange = (e) => {
    this.setState({minDisposedToLose: e.target.value})
  }

  onSearchChange = (value) => {
    this.setState({searchResult: value})
  }

  onAddClick = () => {
    let assetList = this.state.assetList
    if(this.state.searchResult){
      let assetData = JSON.parse(this.state.searchResult)
      assetData.minPercentage = 0
      assetData.maxPercentageError = ""
      assetData.minPercentageError = ""
      assetData.maxPercentage = 0
      assetList.push(assetData)
      this.setState({
        assetList: this.cleanValidationProcess(assetList),
        minDisposedToLoseErrorMessage: "",
        errorMessage: "",
        searchResult: "",
      })
    }
  }

  onDeleteClick = (id) => {
    let assetList = this.state.assetList
    assetList = assetList.filter(assetData => assetData.id != id)
    this.setState({assetList: assetList})
  }

  onMinAssetChange = (e, id) => {
    let data = this.getAssetDataById(id)
    data[0].minPercentage = e.target.value
    let assetList = this.state.assetList
    assetList[data[1]] = data[0]
    this.setState({assetList: assetList})
  }

  onMaxAssetChange = (e, id) => {
    let data = this.getAssetDataById(id)
    data[0].maxPercentage = e.target.value
    let assetList = this.state.assetList
    assetList[data[1]] = data[0]
    this.setState({assetList: assetList})
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
            type="error"
            message={this.state.errorMessage}
            onClose={this.onSnackBarClose}
            open={this.state.open}
          />
          <ToolBar
            searchValue={this.state.searchResult}
            onSearchChange={this.onSearchChange}
            onAddClick={this.onAddClick}
            onMinDisposedToLoseChange={this.onMinDisposedToLoseChange}
            minDisposedToLoseValue={this.state.minDisposedToLose}
            onValidateClick={this.onValidateClick}
            loadingValidation={this.state.loadingValidation}
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

export default PortfolioOptimization
