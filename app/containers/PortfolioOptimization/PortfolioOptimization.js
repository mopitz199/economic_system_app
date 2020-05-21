import React from 'react';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import PapperBlock from '../../components/PapperBlock/PapperBlock';
import ToolBar from './ToolBar';
import Assets from './Assets';

class PortfolioOptimization extends React.Component {

  constructor(props) {
    super(props);
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
          <ToolBar />
          <Assets />
        </PapperBlock>
      </div>
    );
  }
}

export default PortfolioOptimization
