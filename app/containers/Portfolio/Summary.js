import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {server, headers} from '../../constants';
import { PortfolioTable } from 'components';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PapperBlock from '../../components/PapperBlock/PapperBlock';
import CounterWidget from '../../components/Counter/CounterWidget';
import colorfull from 'ba-api/colorfull';


const styles = theme => ({
  counterIcon: {
    color: theme.palette.common.white,
    opacity: 0.7,
    fontSize: 84
  }
});

function Summary(props){
  const {classes} = props
  const [assetPortdolioData, setAssetPortdolioData] = useState({
    'earnings': 0,
    'best': 0,
    'worst': 0,
    'performance': 0,
    'total_invested': 0,
  });

  useEffect(() => {
    fetch(
      `${server}/api/portfolio/asset_portoflio_data/`,
      {headers}
    )
      .then(res => res.json())
      .then(res => {
        setAssetPortdolioData(res['results'])
      })
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <CounterWidget
          color={colorfull[0]}
          start={0}
          end={assetPortdolioData.total_invested}
          preAppendText="$"
          duration={3}
          decimals={2}
          title="Invested amount"
        >
          <MonetizationOnIcon className={classes.counterIcon} />
        </CounterWidget>
      </Grid>
      <Grid item md={3}>
        <CounterWidget
          color={colorfull[1]}
          start={0}
          end={assetPortdolioData.earnings}
          preAppendText="$"
          duration={3}
          decimals={2}
          title="Earnings"
        >
          <MonetizationOnIcon className={classes.counterIcon} />
        </CounterWidget>
      </Grid>
      <Grid item md={2}>
        <CounterWidget
          color={colorfull[2]}
          start={0}
          end={assetPortdolioData.performance}
          appendText="%"
          duration={3}
          decimals={2}
          title="Performance"
        >
          <MonetizationOnIcon className={classes.counterIcon} />
        </CounterWidget>
      </Grid>
      <Grid item md={2}>
        <CounterWidget
          color={colorfull[3]}
          start={0}
          end={0}
          duration={0}
          appendText={assetPortdolioData.worst}
          hideNumber={true}
          title="Worst"
        >
          <MonetizationOnIcon className={classes.counterIcon} />
        </CounterWidget>
      </Grid>
      <Grid item md={2}>
        <CounterWidget
          color={colorfull[4]}
          start={0}
          end={0}
          duration={0}
          appendText={assetPortdolioData.best}
          hideNumber={true}
          title="Best"
        >
          <MonetizationOnIcon className={classes.counterIcon} />
        </CounterWidget>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Summary);