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
  });

  useEffect(() => {
    fetch(
      `${server}/api/asset/asset_portoflio_data/`,
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
          end={assetPortdolioData.earnings}
          preAppendText="$"
          duration={3}
          decimals={2}
          title="Earnings"
        >
          <MonetizationOnIcon className={classes.counterIcon} />
        </CounterWidget>
      </Grid>
      <Grid item md={3}>
        <CounterWidget
          color={colorfull[1]}
          start={0}
          end={assetPortdolioData.best}
          appendText="%"
          duration={3}
          decimals={2}
          title="Best performance"
        >
          <MonetizationOnIcon className={classes.counterIcon} />
        </CounterWidget>
      </Grid>
      <Grid item md={3}>
        <CounterWidget
          color={colorfull[2]}
          start={0}
          end={assetPortdolioData.worst}
          appendText="%"
          duration={3}
          decimals={2}
          title="Worst performance"
        >
          <MonetizationOnIcon className={classes.counterIcon} />
        </CounterWidget>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Summary);