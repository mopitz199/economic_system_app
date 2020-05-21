import React from 'react';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import PapperBlock from '../../components/PapperBlock/PapperBlock';
import ToolBar from './ToolBar';
import Assets from './Assets';

class PortfolioOptimization extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResult: "",
      assetList: [],
      minDisposedToLose: null,
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
      assetData.maxPercentage = 0
      assetList.push(assetData)
      this.setState({
        assetList: assetList,
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
          <ToolBar
            searchValue={this.state.searchResult}
            onSearchChange={this.onSearchChange}
            onAddClick={this.onAddClick}
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
