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

function Asset(props) {
  return (
    <Grid item md={2}>
      <CustomCard
        avatar={avatarApi[2]}
        name={props.assetData.asset.symbol}
        subText={props.assetData.asset.name}
        assetData={props.assetData}
        onDeleteClick={() => props.onDeleteClick(props.assetData.id)}
        onMinAssetChange={props.onMinAssetChange}
        onMaxAssetChange={props.onMaxAssetChange}
        onAmountToInvestChange={props.onAmountToInvestChange}
        showSimulationMode={props.showSimulationMode}
      />
    </Grid>
  );
}

function renderAssets(
  assetList,
  onDeleteClick,
  onMinAssetChange,
  onMaxAssetChange,
  onAmountToInvestChange,
  showSimulationMode,
) {
  const assetComponents = [];
  assetList.forEach((assetData, index) => {
    assetComponents.push(
      <Asset
        key={index}
        assetData={assetData}
        onDeleteClick={onDeleteClick}
        onMinAssetChange={onMinAssetChange}
        onMaxAssetChange={onMaxAssetChange}
        onAmountToInvestChange={onAmountToInvestChange}
        showSimulationMode={showSimulationMode}
      />
    );
  });
  return assetComponents;
}


function Assets(props) {
  const { classes } = props;
  return (
    <Grid container className={classes.root} spacing={1}>
      {renderAssets(
        props.assetList,
        props.onDeleteClick,
        props.onMinAssetChange,
        props.onMaxAssetChange,
        props.onAmountToInvestChange,
        props.showSimulationMode,
      )}
    </Grid>
  );
}

export default withStyles(styles)(Assets);
