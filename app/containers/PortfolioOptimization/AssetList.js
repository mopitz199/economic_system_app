import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import tableStyles from 'ba-styles/Table.scss';
import {
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
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
import CancelIcon from '@material-ui/icons/Cancel';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


const rowStyles = theme => {
  //debugger
  return {
    tableCell: {
      padding: theme.spacing(1)
    },
    greenColor: {
      color: theme.palette.success.main
    },
    assetName: {
      fontWeight: theme.typography.fontWeightBold,
      cursor: 'pointer'
    }
  }
}
function Row(props){
  const {classes} = props
  return (
    <TableRow key={props.key}>
      <TableCell
        className={classes.tableCell, classes.assetName}
        onClick={() => props.onCellNameClick(props.assetData.asset.id)}
      >
        {props.assetData.asset.name}
      </TableCell>

      <TableCell className={classes.tableCell} align="left">
        <FormControl
          error={props.assetData.minPercentageError != ''}
          fullWidth
        >
          <Input
            id="adornment-min-percentage"
            value={props.assetData.min_to_invest}
            onChange={e => props.onMinAssetChange(e, props.assetData.componentId)}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
          <FormHelperText id="name-error-text">
            {props.assetData.minPercentageError}
          </FormHelperText>
        </FormControl>
      </TableCell>

      <TableCell className={classes.tableCell} align="left">
        <FormControl
          error={props.assetData.maxPercentageError != ''}
          fullWidth
        >
          <Input
            id="adornment-max-percentage"
            value={props.assetData.max_to_invest}
            onChange={e => props.onMaxAssetChange(e, props.assetData.componentId)}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
          <FormHelperText id="name-error-text">
            {props.assetData.maxPercentageError}
          </FormHelperText>
        </FormControl>
      </TableCell>

      <TableCell className={classes.tableCell} align="left">
        <FormControl
          error={props.assetData.amountToInvestError != ''}
          fullWidth
        >
          <Input
            id="adornment-amount-to-invest"
            value={props.assetData.amount_to_invest}
            onChange={e => props.onAmountToInvestChange(e, props.assetData.componentId)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <FormHelperText id="name-error-text">
            {''}
          </FormHelperText>
        </FormControl>
      </TableCell>

      {props.assetData.percentageToInvestResult != '' ? 
        <TableCell
          className={classes.tableCell, classes.greenColor}
          align="left">{`${props.assetData.percentageToInvestResult}%`}
        </TableCell>
        :
        <TableCell className={classes.tableCell} align="left">-</TableCell>
      }
      {props.assetData.amountToInvestResult != '' ? 
        <TableCell className={classes.tableCell, classes.greenColor} align="left">
          {`$${props.assetData.amountToInvestResult}`}
        </TableCell>
        :
        <TableCell className={classes.tableCell} align="left">-</TableCell>
      }
      <TableCell className={classes.tableCell} align="left">
        <IconButton
          aria-label="Close"
          onClick={() => props.onDeleteClick(props.assetData.id)}
        >
          <CancelIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
const RowComponent = withStyles(rowStyles)(Row)

function renderRows(
  assetList,
  onDeleteClick,
  onMinAssetChange,
  onMaxAssetChange,
  onAmountToInvestChange,
  onCellNameClick,
  showSimulationMode,
){
  const rowComponents = [];
  assetList.forEach((assetData, index) => {
    rowComponents.push(
      <RowComponent
        key={index}
        assetData={assetData}
        onDeleteClick={onDeleteClick}
        onMinAssetChange={onMinAssetChange}
        onMaxAssetChange={onMaxAssetChange}
        onAmountToInvestChange={onAmountToInvestChange}
        onCellNameClick={onCellNameClick}
        showSimulationMode={showSimulationMode}
      />
    );
  });
  return rowComponents;
}

function AssetList(props){
  const { classes } = props;
  return (
    <Table className={classNames(classes.table, tableStyles.bordered)}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="left">Min to invest</TableCell>
          <TableCell align="left">Max to invest</TableCell>
          <TableCell align="left">Amount to invest</TableCell>
          <TableCell align="left">Percentage</TableCell>
          <TableCell align="left">Amount</TableCell>
          <TableCell align="left">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {renderRows(
          props.assetList,
          props.onDeleteClick,
          props.onMinAssetChange,
          props.onMaxAssetChange,
          props.onAmountToInvestChange,
          props.onCellNameClick,
          props.showSimulationMode,
        )}
      </TableBody>
    </Table>
  )
}
export default withStyles(styles)(AssetList)