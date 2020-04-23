/* eslint-disable */
import React from 'react';
import MUIDataTable from 'mui-datatables';
import classnames from 'classnames';
import tableStyles from 'ba-styles/Table.scss';
import {
  Grid,
  Typography,
  Box,
} from '@material-ui/core';
import Type from 'ba-styles/Typography.scss';
import CircularIndeterminate from './Loader';
import EmptyIcon from '../CustomIcons/EmptyIcon';
import {server, headers} from '../../constants';

import './MilestoneTable.css';

class AdvFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: 'Id',
          options: {
            display: false,
            filter: false,
            sort: false,
          }
        },
        {
          name: 'Name',
          options: {
            filter: false,
            sort: true,
            setCellProps: () => ({className: classnames('cellPadding')})
          }
        },
        {
          name: 'Symbol',
          options: {
            filter: false,
            sort: true,
            setCellProps: () => ({className: classnames('cellPadding')})
          }
        },
        {
          name: 'Type',
          options: {
            setCellProps: () => ({className: classnames('cellPadding')})
          }
        },
        {
          name: 'Sector',
          options: {
            setCellProps: () => ({className: classnames('cellPadding')})
          }
        },
        {
          name: 'Industry',
          options: {
            setCellProps: () => ({className: classnames('cellPadding')})
          }
        },
        {
          name: 'Crisis 2000(%)',
          options: {
            filter: false,
            sort: true,
            setCellProps: (value) => {
              return {
                className: classnames(this.percentageStyle(value), 'cellPadding'),
              }
            },
            customBodyRender: (value, tableMeta, updateValue) => {
              if(value){
                return `${value}%`
              }else{
                return value
              }
            }
          }
        },
        {
          name: 'Crisis 2008(%)',
          options: {
            filter: false,
            sort: true,
            setCellProps: (value) => {
              return {
                className: classnames(this.percentageStyle(value), 'cellPadding'),
              }
            },
            customBodyRender: (value, tableMeta, updateValue) => {
              if(value){
                return `${value}%`
              }else{
                return value
              }
            }
          }
        },
        {
          name: 'Crisis COVID-19',
          options: {
            filter: false,
            sort: true,
            setCellProps: (value) => {
              return {
                className: classnames(this.percentageStyle(value), 'cellPadding'),
              }
            },
            customBodyRender: (value, tableMeta, updateValue) => {
              if(value){
                return `${value}%`
              }else{
                return value
              }
            }
          }
        },
      ],
      data: []
    }
  }

  percentageStyle = (value) => {
    if(value){
      if(value.includes('-')){
        return Type.textError
      }
      if(!value.includes('-')){
        return Type.textSuccess
      }
    }
  }

  componentWillMount(){
    fetch(
      `${server}/api/chart/chart/milestones/`,
      {headers}
    )
      .then(res => res.json())
      .then(res => this.setState({
        'data': res['results']
      }))
  }

  render() {
    const { columns, data } = this.state;
    const options = {
      filterType: 'dropdown',
      responsive: 'stacked',
      print: true,
      page: 1,
      rowsPerPageOptions: [10,50,100,200],
      rowsPerPage: 200,
      selectableRowsHeader: false,
      disableToolbarSelect: true,
      selectableRows: false,
      setTableProps: () => {
        return {
          size: "small",
        };
      },
      onRowClick: (row) => {
        const assetId = row[0]
        const assetUrl = `${window.location.origin}/app/asset/${assetId}`
        window.open(assetUrl, "_blank")
      }
    };
    if(data.length > 0){
      return (
        <MUIDataTable
          title="Assets"
          data={data}
          className={classnames(tableStyles.small)}
          columns={columns}
          options={options}
        />
      );
    }else{
      return (
        <Grid
          container
          alignItems={'center'}
          direction={'column'}
          justify={'center'}
        >
          <CircularIndeterminate />
          <EmptyIcon size={200} />
          <Box m={4}>
            <Typography variant="h5" className={Type.regular}>We're loading all the data, It could take a while. Go for a cofee :D</Typography>
          </Box>
        </Grid>
      )
    }
  }
}

export default AdvFilter;
