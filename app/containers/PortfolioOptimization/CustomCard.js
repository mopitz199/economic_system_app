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
} from '@material-ui/core';
import styles from '../../components/CardPaper/cardStyle-jss';


const titleStyles = theme => {
  return {
    percentageDistribution: {
      marginLeft: theme.spacing(1),
      color: theme.palette.success.main
    }
  }
}


function Title(props){
  const { classes } = props;
  return (
    <span>
      <span>{props.assetData.symbol}</span>
      <span className={classes.percentageDistribution}>
        {props.assetData.percentageDistribution
          ? `${props.assetData.percentageDistribution}%`
          : null
        }
      </span>
    </span>
  )
}
const TitleComponent = withStyles(titleStyles)(Title)

function CustomCard(props){

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
          <Avatar alt="avatar" src={avatar} className={classes.avatar} />
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
        title={<TitleComponent assetData={props.assetData}/>}
        subheader={subText}
      />
      <CardContent>
        <FormControl
          error={props.assetData.minPercentageError!=""}
          fullWidth
          className={classes.margin}
        >
          <InputLabel htmlFor="adornment-min-percentage">Min</InputLabel>
          <Input
            id="adornment-min-percentage"
            value={props.assetData.minPercentage}
            onChange={e => props.onMinAssetChange(e, props.assetData.id)}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
          <FormHelperText id="name-error-text">
            {props.assetData.minPercentageError}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={props.assetData.maxPercentageError!=""}
          fullWidth
          className={classes.margin}
        >
          <InputLabel htmlFor="adornment-max-percentage">Max</InputLabel>
          <Input
            id="adornment-max-percentage"
            value={props.assetData.maxPercentage}
            onChange={e => props.onMaxAssetChange(e, props.assetData.id)}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
          <FormHelperText id="name-error-text">
            {props.assetData.maxPercentageError}
          </FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(CustomCard);
