import React from 'react';
import { Grid } from '@material-ui/core';
import TrendingDown from '@material-ui/icons/TrendingDown';
import TrendingUp from '@material-ui/icons/TrendingUp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { withStyles } from '@material-ui/core/styles';
import CounterWidget from '../../components/Counter/CounterWidget';
import colorfull from 'ba-api/colorfull';

const styles = theme => ({
  counterIcon: {
    color: theme.palette.common.white,
    opacity: 0.7,
    fontSize: 84
  }
})

function Summary(props){
  const {classes} = props
  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <CounterWidget
          color={colorfull[0]}
          start={0}
          end={props.performance.price}
          preAppendText={'$'}
          duration={3}
          decimals={props.performance.num_decimals}
          title="Price"
        >
          <MonetizationOnIcon className={classes.counterIcon}/>
        </CounterWidget>
      </Grid>
      <Grid item md={3}>
        <CounterWidget
          color={colorfull[1]}
          start={0}
          end={props.performance.historical_max_price}
          preAppendText={'$'}
          duration={3}
          title="Historical Max"
        >
          <MonetizationOnIcon className={classes.counterIcon}/>
        </CounterWidget>
      </Grid>
      <Grid item md={2}>
        <CounterWidget
          color={colorfull[2]}
          start={0}
          end={props.performance.day_performance}
          appendText={'%'}
          duration={3}
          decimals={props.day_performance_num_integers == 3 ? 1 : 2}
          title="24 Hour"
        >
          {props.performance.day_performance < 0
            ? <TrendingDown className={classes.counterIcon}/>
            : <TrendingUp className={classes.counterIcon}/>
          }
        </CounterWidget>
      </Grid>
      <Grid item md={2}>
        <CounterWidget
          color={colorfull[3]}
          start={0}
          end={props.performance.weekly_performance}
          appendText={'%'}
          duration={3}
          decimals={props.performance.weekly_performance_num_integers == 3 ? 1 : 2}
          title="Week"
        >
          {props.performance.weekly_performance < 0
            ? <TrendingDown className={classes.counterIcon}/>
            : <TrendingUp className={classes.counterIcon}/>
          }
        </CounterWidget>
      </Grid>
      <Grid item md={2}>
        <CounterWidget
          color={colorfull[4]}
          start={0}
          end={props.performance.monthly_performance}
          appendText={'%'}
          duration={3}
          decimals={props.monthly_performance_num_integers == 3 ? 1 : 2}
          title="Monthly"
        >
          {props.performance.monthly_performance < 0
            ? <TrendingDown className={classes.counterIcon}/>
            : <TrendingUp className={classes.counterIcon}/>
          }
        </CounterWidget>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Summary);