import React from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import { PapperBlock, AssetChart } from 'components';
import { Box } from '@material-ui/core';
import {server, headers} from '../../constants';
import TimeFrameOption from './TimeFrameOption';
import Summary from './Summary';


class Asset extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      asset: null,
      currentTimeFrame: '1m',
      assetPerformance: null,
    };
  }

  getAssetProfile = (assetId) => {
    return fetch(
      `${server}/api/asset/asset_profile/?asset_id=${assetId}`,
      {headers}
    )
      .then(res => res.json())
      .then(res => res['results'])
  }

  getChart = (asset, timeFrame, start) => {
    const end = moment().format('YYYY-MM-DD 00:00:00');
    const body = {
      "symbol": asset.symbol,
      "start": start.format('YYYY-MM-DD 00:00:00'),
      "end": end,
      "asset_type": asset.asset_type,
      "time_frame": timeFrame
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

  renderAssetInfo = (assetProfile) => {
    this.setState({'assetProfile': assetProfile})
  }

  componentWillMount(){
    const { assetId } = this.props.match.params
    this.getAssetProfile(assetId)
      .then((assetProfile) => {
        this.renderAssetInfo(assetProfile)
        const start = moment("1990-1-1");
        return this.getChart(assetProfile.asset, "1m", start)
      })
      .then((chartData) => {
        this.renderChartData(chartData)
      })
  }

  renderAssetPage = () => {
    return (
      <div>
        <Summary performance={this.state.assetProfile.performance}/>
        <PapperBlock title={this.state.assetProfile.asset.name} desc={this.state.assetProfile.asset.symbol}>
          <Box display="flex" justifyContent="center" mt={2} mb={4}>
            <Box display="flex" justifyContent="space-between" width="50%"> 
              <TimeFrameOption
                avatarText='1H'
                label='1 Hour'
                timeFrame='1h'
                currentTimeFrame={this.state.currentTimeFrame}
                onClick={() => {
                  this.setState({'currentTimeFrame': '1h'})
                  const start = moment().subtract(10, 'days')
                  this.getChart(this.state.assetProfile.asset, "1h", start)
                    .then((chartData) => {
                      this.renderChartData(chartData)
                    })
                }}
              />
              <TimeFrameOption
                avatarText='4H'
                label='4 Hour'
                timeFrame='4h'
                currentTimeFrame={this.state.currentTimeFrame}
                onClick={() => {
                  this.setState({'currentTimeFrame': '4h'})
                  const start = moment().subtract(40, 'days')
                  this.getChart(this.state.assetProfile.asset, "4h", start)
                    .then((chartData) => {
                      this.renderChartData(chartData)
                    })
                }}
              />
              <TimeFrameOption
                avatarText='1D'
                label='1 Day'
                timeFrame='1d'
                currentTimeFrame={this.state.currentTimeFrame}
                onClick={() => {
                  this.setState({'currentTimeFrame': '1d'})
                  const start = moment().subtract(356, 'days')
                  this.getChart(this.state.assetProfile.asset, "1d", start)
                    .then((chartData) => {
                      this.renderChartData(chartData)
                    })
                }}
              />
              <TimeFrameOption
                avatarText='1W'
                label='1 Week'
                timeFrame='1w'
                currentTimeFrame={this.state.currentTimeFrame}
                onClick={() => {
                  this.setState({'currentTimeFrame': '1w'})
                  const start = moment().subtract(365*5, 'days')
                  this.getChart(this.state.assetProfile.asset, "1w", start)
                    .then((chartData) => {
                      this.renderChartData(chartData)
                    })
                }}
              />
              <TimeFrameOption
                avatarText='1M'
                label='1 Month'
                timeFrame='1m'
                currentTimeFrame={this.state.currentTimeFrame}
                onClick={() => {
                  this.setState({'currentTimeFrame': '1m'})
                  const start = moment("1990-1-1");
                  this.getChart(this.state.assetProfile.asset, "1m", start)
                    .then((chartData) => {
                      this.renderChartData(chartData)
                    })
                }}
              />
              <TimeFrameOption
                avatarText='1Y'
                label='1 Year'
                timeFrame='1y'
                currentTimeFrame={this.state.currentTimeFrame}
                onClick={() => {
                  this.setState({'currentTimeFrame': '1y'})
                  const start = moment("1990-1-1");
                  this.getChart(this.state.assetProfile.asset, "1y", start)
                    .then((chartData) => {
                      this.renderChartData(chartData)
                    })
                }}
              />
            </Box>
          </Box>
          <AssetChart data={this.state.data}/>
        </PapperBlock>
      </div>
    )
  }

  renderLoading = () => {
    return (
      <PapperBlock title='' desc=''>
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
