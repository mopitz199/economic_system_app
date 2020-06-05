import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Avatar,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
  Box,
  Chip,
} from '@material-ui/core';
import styles from '../../components/CardPaper/cardStyle-jss';





function TitleComponent(props) {
  const { classes } = props;
  return (
    <span>
      <span>{props.assetData.asset.symbol}</span>
    </span>
  );
}

const customCardStyles = theme => {
  return {
    ...styles(theme),
    minInputBox: {
      marginRight: theme.spacing(4)
    }
  }
}

const optimizationResultStyles = theme => {
  return {
    optimizationResultBox: {
      marginTop: theme.spacing(1)
    },
    percentageChip:{
      backgroundColor: theme.palette.info.main
    },
    amountChip:{
      backgroundColor: theme.palette.success.main
    },
    inputToInvestBox:{
      marginTop: theme.spacing(1)
    }
  }
}
function OptimizationResult(props){
  const {classes, onAmountToInvestChange, assetData} = props
  return (
    <Box>
      <Box className={classes.inputToInvestBox}>
        <FormControl
          error={assetData.amountToInvestError != ''}
          fullWidth
          className={classes.margin}
        >
          <InputLabel htmlFor="adornment-min-percentage">Amount to invest</InputLabel>
          <Input
            id="adornment-min-percentage"
            value={assetData.amountToInvest}
            onChange={e => onAmountToInvestChange(e, assetData.id)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <FormHelperText id="name-error-text">
            {assetData.amountToInvestError}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.optimizationResultBox}
      >
        {assetData.amountToInvestResult ? 
          <Chip
            label={`$${assetData.amountToInvestResult}`}
            className={classes.amountChip}
            color="secondary"
          /> : null
        }
        {assetData.percentageToInvestResult ? 
          <Chip
            label={`${assetData.percentageToInvestResult}%`}
            className={classes.percentageChip}
            color="primary"
          /> : null
        }
      </Box>
    </Box>
  )
}
const OptimizationResultComponent = withStyles(optimizationResultStyles)(OptimizationResult);


function CustomCard(props) {
  const {
    classes,
    avatar,
    name,
    subText,
    image,
  } = props;
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar alt="avatar" src="https://www.pngitem.com/pimgs/m/5-52517_free-stock-exchange-svg-stock-market-icon-png.png" className={classes.avatar} />
        }
        action={(
          <IconButton
            aria-label="Close"
            className={classes.button}
            onClick={props.onDeleteClick}
          >
            <CancelIcon />
          </IconButton>
        )}
        title={<TitleComponent assetData={props.assetData} />}
        subheader={subText}
      />
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Box display="flex">
            <Box className={classes.minInputBox}>
              <FormControl
                error={props.assetData.minPercentageError != ''}
                fullWidth
                className={classes.margin}
              >
                <InputLabel htmlFor="adornment-min-percentage">Min</InputLabel>
                <Input
                  id="adornment-min-percentage"
                  value={props.assetData.min_to_invest}
                  onChange={e => props.onMinAssetChange(e, props.assetData.id)}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
                <FormHelperText id="name-error-text">
                  {props.assetData.minPercentageError}
                </FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <FormControl
                error={props.assetData.maxPercentageError != ''}
                fullWidth
                className={classes.margin}
              >
                <InputLabel htmlFor="adornment-max-percentage">Max</InputLabel>
                <Input
                  id="adornment-max-percentage"
                  value={props.assetData.max_to_invest}
                  onChange={e => props.onMaxAssetChange(e, props.assetData.id)}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
                <FormHelperText id="name-error-text">
                  {props.assetData.maxPercentageError}
                </FormHelperText>
              </FormControl>
            </Box>
          </Box>
          {props.showSimulationMode
            ? <OptimizationResultComponent
                assetData={props.assetData}
                onAmountToInvestChange={props.onAmountToInvestChange}
              />
            : null
          }
        </Box>
      </CardContent>
    </Card>
  );
}

export default withStyles(customCardStyles)(CustomCard);
