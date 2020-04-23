import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock, AssetChart } from 'components';

import {server, headers} from '../../constants';
import moment from 'moment';

class Asset extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      asset: null
    };
  }

  getAsset = (assetId) => {
    return fetch(
      `${server}/api/asset/assets/${assetId}/`,
      {headers}
    )
      .then(res => res.json())
  }

  getChart = (asset) => {
    const end = moment().format('YYYY-MM-DD 00:00:00');
    const body = {
      "symbol": asset.symbol,
      "start": "1990-1-1 00:00:00",
      "end": end,
      "asset_type": asset.asset_type,
      "time_frame": "1m"
    }
    return fetch(
      `${server}/api/chart/chart/generate_chart/`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers
      }
    )
      .then(res => res.json())
      .then(res => res['results'])
  }

  renderChartData = (chartData) => {
    this.setState({
      'loaded': true,
      'data': chartData
    })
  }

  renderAssetInfo = (asset) => {
    this.setState({'asset': asset})
  }

  componentWillMount(){
    const { assetId } = this.props.match.params
    this.getAsset(assetId)
      .then((asset) => {
        this.renderAssetInfo(asset)
        return this.getChart(asset)
      })
      .then((chartData) => {
        this.renderChartData(chartData)
      })
  }

  renderAssetPage = () => {
    return (
      <PapperBlock title={this.state.asset.name} desc={this.state.asset.symbol}>
        <AssetChart data={this.state.data}/>
      </PapperBlock>
    )
  }

  renderLoading = () => {
    return (
      <PapperBlock>
        <h1>Loading...</h1>
      </PapperBlock>
    )
  }

  render() {
    const title = 'Boss Ultimate. Blank Page';
    const description = 'Boss Ultimate';
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
        {this.state.loaded
          ? this.renderAssetPage()
          : this.renderLoading()
        }
      </div>
    )
  }
}

export default Asset;
