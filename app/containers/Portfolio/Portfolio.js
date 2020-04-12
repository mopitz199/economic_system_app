import React from 'react';
import { Helmet } from 'react-helmet';
import { PortfolioTable } from 'components';
import PapperBlock from '../../components/PapperBlock/PapperBlock';

class Portfolio extends React.Component {
  render() {
    const title = 'Portfolio';
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
        <PapperBlock title="Portfolio" desc="The section where you can track all the real time wealth of your portfolio">
          <PortfolioTable />
        </PapperBlock>
      </div>
    );
  }
}

export default Portfolio;
