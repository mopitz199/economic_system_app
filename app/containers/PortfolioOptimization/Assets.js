import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import avatarApi from 'ba-api/avatars';
import CustomCard from './CustomCard';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

function Asset(props){
  return (
    <Grid item md={2}>
      <CustomCard
        avatar={avatarApi[2]}
        name={props.assetData.symbol}
        subText={props.assetData.name}
        assetData={props.assetData}
        onDeleteClick={() => props.onDeleteClick(props.assetData.id)}
        onMinAssetChange={props.onMinAssetChange}
        onMaxAssetChange={props.onMaxAssetChange}
      />
    </Grid>
  )
}

function renderAssets(
  assetList,
  onDeleteClick,
  onMinAssetChange,
  onMaxAssetChange,
){
  let assetComponents = []
  assetList.forEach(assetData => {
    assetComponents.push(
      <Asset
        key={assetData.id}
        assetData={assetData}
        onDeleteClick={onDeleteClick}
        onMinAssetChange={onMinAssetChange}
        onMaxAssetChange={onMaxAssetChange}
      />
    )
  });
  return assetComponents
}


function Assets(props){
  const { classes } = props;
  return (
    <Grid container className={classes.root} spacing={1}>
      {renderAssets(
        props.assetList,
        props.onDeleteClick,
        props.onMinAssetChange,
        props.onMaxAssetChange,
      )}
    </Grid>
  )
}

export default withStyles(styles)(Assets);