import React from 'react';
import { Helmet } from 'react-helmet';
import { MilestoneTable } from 'components';
import PapperBlock from '../../components/PapperBlock/PapperBlock';

class SamplePage extends React.Component {
  render() {
    const title = 'Milestones';
    const description = 'The section where you can chekc the behavior of all the assets during some special periods';
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
        <PapperBlock title="Milestones" desc="The section where you can chekc the behavior of all the assets during some special periods">
          <MilestoneTable />
        </PapperBlock>
      </div>
    );
  }
}

export default SamplePage;
