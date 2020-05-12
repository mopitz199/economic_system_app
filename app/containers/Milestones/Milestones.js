import React from 'react';
import { Helmet } from 'react-helmet';
import { Input, InputLabel, MenuItem, FormControl, FormHelperText, Select, Box } from '@material-ui/core';
import { MilestoneTable } from 'components';
import PapperBlock from '../../components/PapperBlock/PapperBlock';

class SamplePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assetType: ''
    };
  }

  handleChange = event => {
    this.setState({ assetType: event.target.value });
  };

  selectRender = () => (
    <Box display="flex" justifyContent="center">
      <FormControl>
        <InputLabel htmlFor="asset-type">Asset Type</InputLabel>
        <Select
          value={this.state.assetType}
          onChange={this.handleChange}
          input={<Input name="assetType" id="asset-type" />}
        >
          <MenuItem value="">
            <em>----</em>
          </MenuItem>
          <MenuItem value="stocks">Stocks</MenuItem>
          <MenuItem value="futures">Futures</MenuItem>
          <MenuItem value="cryptos">Cryptos</MenuItem>
          <MenuItem value="etf">ETF</MenuItem>
          <MenuItem value="currencies">Currencies</MenuItem>
        </Select>
        <FormHelperText>Choose the asset type that you would like to check</FormHelperText>
      </FormControl>
    </Box>
  )

  render() {
    const title = 'Milestones';
    const description = 'The section where you can check the behavior of all the assets during some special periods. In the right top of the table you can display of the milestone available.';
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
        <PapperBlock title="Milestones" desc="The section where you can check the behavior of all the assets during some special periods. In the right top of the table you can display of the milestone available.">
          <MilestoneTable />
        </PapperBlock>
      </div>
    );
  }
}

export default SamplePage;
