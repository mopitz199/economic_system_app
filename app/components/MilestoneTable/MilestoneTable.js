/* eslint-disable */
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import classnames from 'classnames';
import Cookies from 'universal-cookie';
import tableStyles from 'ba-styles/Table.scss';
import Type from 'ba-styles/Typography.scss';
import Loader from './Loader';
import CustomHeader from './CustomHeader';
import MilestoneCustomHeader from './MilestoneCustomHeader';
import EmptyIcon from '../CustomIcons/EmptyIcon';
import {server, headers} from '../../constants';
import './MilestoneTable.css';

const styles = theme => {
  return {
    odd: {
      backgroundColor: theme.palette.grey['100'],
    },
    cellPadding: {
      padding: '5px 16px !important'
    },
    minWidth: {
      minWidth: '200px'
    },
    minWidthMilestone: {
      minWidth: '180px'
    },
    customHead: {
      borderSpacing: '0',
      borderCollapse: 'collapse',
      fontSize: '0.875rem',
      textAlign: 'left',
      fontWeight: '500',
      lineHeight: '1.43',
      letterSpacing: '0.01071em',
    },
    clickableCell: {
      cursor: 'pointer',
      fontWeight: 'bold',
    }
  }
}


function getColor(value){
  if(0<=value && value<20){
    return "#f44336"
  }else if(20<=value && value<40){
    return "#f48636"
  }else if(40<=value && value<60){
    return "#b5a529"
  }else if(60<=value && value<80){
    return "#7ab902"
  }else if(80<=value && value<=100){
    return "#1eb304"
  }else{

  }
}


class MilestoneTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      columns: [
        {
          name: 'Id',
          options: {
            viewColumns: false,
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
            sortDirection: 'none',
            setCellProps: () => ({
              className: classnames(
                this.props.classes.cellPadding,
                this.props.classes.clickableCell,
                this.props.classes.minWidth
              )
            }),
            customHeadRender: ({index, name,...column}, sortColumn) => (
              <CustomHeader key={index} index={index} name={name} column={column} sortColumn={sortColumn}/>
            )
          }
        },
        {
          name: 'Symbol',
          options: {
            filter: false,
            sort: true,
            sortDirection: 'none',
            setCellProps: () => ({
              className: classnames(
                this.props.classes.cellPadding,
                this.props.classes.minWidth
              )
            }),
            customHeadRender: ({index, name,...column}, sortColumn) => (
              <CustomHeader key={index} index={index} name={name} column={column} sortColumn={sortColumn}/>
            )
          }
        },
        {
          name: 'Type',
          options: {
            viewColumns: true,
            display: false,
            filter: true,
            sort: false,
            setCellProps: () => ({
              className: classnames(
                this.props.classes.cellPadding,
                this.props.classes.minWidth
              )
            }),
            customHeadRender: ({index, name,...column}, sortColumn) => (
              <CustomHeader key={index} index={index} name={name} column={column} sortColumn={sortColumn}/>
            )
          },
        },
        {
          name: 'Sector',
          sortDirection: 'none',
          options: {
            setCellProps: () => ({
              className: classnames(
                this.props.classes.cellPadding,
                this.props.classes.minWidth
              )
            }),
            customHeadRender: ({index, name,...column}, sortColumn) => (
              <CustomHeader key={index} index={index} name={name} column={column} sortColumn={sortColumn}/>
            )
          }
        },
        {
          name: 'Industry',
          sortDirection: 'none',
          options: {
            setCellProps: () => ({
              className: classnames(
                this.props.classes.cellPadding,
                this.props.classes.minWidth
              )
            }),
            customHeadRender: ({index, name,...column}, sortColumn) => (
              <CustomHeader key={index} index={index} name={name} column={column} sortColumn={sortColumn}/>
            )
          }
        },
        {
          name: 'Healthy',
          sortDirection: 'none',
          options: {
            setCellProps: (percentageValue) => {
              percentageValue = percentageValue.replace("%", "")
              return {
                className: classnames(
                  this.props.classes.cellPadding,
                  this.props.classes.minWidth
                ),
                style: {'color': getColor(parseFloat(percentageValue))}
              }
            },
            customBodyRender: (value, tableMeta, updateValue) => {
              if(value!=null){
                return `${Math.round(value*100)}%`
              }else{
                return value
              }
            },
            customHeadRender: ({index, name,...column}, sortColumn) => (
              <CustomHeader key={index} index={index} name={name} column={column} sortColumn={sortColumn}/>
            )
          }
        },
      ],
      options: {
        announceText: "",
        filter: true,
        filterType: 'dropdown',
        responsive: 'scrollMaxHeight',
        fixedHeaderOptions: {
          xAxis: true,
          yAxis: true
        },
        //responsive: 'stacked',
        data: [],
        displayData: [],
        print: true,
        page: 0,
        filterList: [[], [], [], [], [], [], [], [],[]],
        serverSideFilterList: [],
        serverSide: true,
        count: null,
        rowsPerPage: 20,
        rowsPerPageOptions: [20,50,100,200],
        selectableRowsHeader: false,
        disableToolbarSelect: true,
        selectableRows: false,
        searchText: "",
      }
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

  buildUrl = (tableOptions) => {
    let url = `${server}/api/chart/chart/milestones/?limit=${tableOptions.rowsPerPage}&page=${tableOptions.page}`
    const sortData = this.getSortData(tableOptions)
    const filterData = this.buildFilterUrl(tableOptions)
    if(sortData){
      url += `&sort_type=${sortData.sortType}&sort_by=${sortData.sortBy}`
    }
    if(tableOptions.searchText){
      url += `&search=${tableOptions.searchText}`
    }
    if(filterData){
      url += `&${filterData.filterTypePath}`
      url += `&${filterData.filterValuePath}`
    }
    return url
  }

  getData = (tableOptions) => {
    const url = this.buildUrl(tableOptions)
    return fetch(
      url,
      {headers}
    )
      .then(res => res.json())
  }

  getSortData = (tableOptions) => {
    let sortType = null
    if(tableOptions.announceText){
      if(tableOptions.announceText.includes("descending")){
        sortType = "descending"
      }
      if(tableOptions.announceText.includes("ascending")){
        sortType = "ascending"
      }
      if(sortType && tableOptions.activeColumn){
        return {
          'sortType': sortType,
          'sortBy': tableOptions.activeColumn
        }
      }
    }
    return null
  }

  buildFilterUrl = (tableOptions) => {
    let filterTypePath = ""
    let filterValuePath = ""
    tableOptions.filterList.forEach((filter, index) => {
      if(filter.length == 1){
        filterTypePath += `filterType[]=${index}&`
        filterValuePath += `filterValue[]=${encodeURIComponent(filter[0])}&`
      }
    })
    if(filterTypePath && filterValuePath){
      return {
        filterTypePath: filterTypePath.substring(0, filterTypePath.length - 1),
        filterValuePath: filterValuePath.substring(0, filterValuePath.length - 1),
      }
    }
    return null
  }

  setSortColumn = (tableOptions) => {
    const sortData = this.getSortData(tableOptions)
    let newColumns = this.state.columns
    this.state.columns.forEach((column, index) => {
      if(index == sortData['sortBy']){
        if(sortData['sortType'] == "descending"){
          newColumns[index].options.sortDirection = "desc"
        }
        if(sortData['sortType'] == "ascending"){
          newColumns[index].options.sortDirection = "asc"
        }
      }else{
        newColumns[index].options.sortDirection = 'none'
      }
    })
    return newColumns
  }

  setDisplayColumn = (tableOptions) => {
    let newColumns = this.state.columns
    tableOptions.columns.forEach((column, index) => {
      newColumns[index].options.display = column.display
    })
    return newColumns
  }

  setFilterColumn = (tableOptions) => {
    let newColumns = this.state.columns
    tableOptions.serverSideFilterList.forEach((filter, index) => {
      if(filter.length == 1){
        newColumns[index].options['filterList'] = filter
      }else{
        newColumns[index].options['filterList'] = []
      }
    })
    return newColumns
  }

  setFilterList = (res, columns) => {
    columns[3].options.filterOptions = {
      'names': res['results']['filterDataList']['asset_type']
    }
    columns[4].options.filterOptions = {
      'names': res['results']['filterDataList']['sector']
    }
    columns[5].options.filterOptions = {
      'names': res['results']['filterDataList']['industry']
    }
    return columns
  }

  getMilestoneColumn = (name, description) => {
    return {
      name: name,
      options: {
        hint: description,
        filter: false,
        sort: true,
        display: false,
        sortDirection: 'none',
        setCellProps: (value) => {
          return {
            className: classnames(
              this.percentageStyle(value),
              this.props.classes.cellPadding,
              this.props.classes.minWidthMilestone
            ),
          }
        },
        customHeadRender: ({index, name,...column}, sortColumn) => {
          return <MilestoneCustomHeader key={index} index={index} name={name} column={column} sortColumn={sortColumn}/>
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          if(value){
            return `${value}%`
          }else{
            return value
          }
        }
      }
    }
  }

  componentWillMount(){
    this.getData(this.state.options)
      .then(res => {
        let newOptions = this.state.options
        let newColumns = this.state.columns
        res['results']['milestoneColumnNames'].forEach((name, index) => {
          let description = ""
          if(index%2){
            description = 'The deepest down in the respective period'
          }else{
            description = 'The biggest up in the respective period'
          }
          newColumns.push(this.getMilestoneColumn(name, description))
        })

        newOptions['data'] = res['results']['data'],
        newOptions['count'] = res['count']
        this.setState({
          'options': newOptions,
          'columns': this.setFilterList(res, this.state.columns),
          'loading': false,
        })
      })
  }

  render() {
    const options = {
      ...this.state.options,
      setRowProps: (row ,index) => {
        if(index%2==0){
          return {className: classnames(this.props.classes.even)}
        }else{
          return {className: classnames(this.props.classes.odd)}
        }
      },
      onCellClick: (value, extraData) => {
        if(extraData.colIndex==1){
          const row = this.state.options.data[extraData.rowIndex]
          const assetId = row[0]
          const assetUrl = `${window.location.origin}/app/asset/${assetId}`
          window.open(assetUrl, "_blank")
        }
      },
      onTableChange: (action, tableOptions) => {

        if(action == 'changePage'){
          this.getData(tableOptions)
            .then((res) => {
              tableOptions['data'] = res['results']['data']
              tableOptions['count'] = res['count']
              this.setState({'options': tableOptions})
            })
        }

        if(action == 'sort'){
          this.getData(tableOptions)
            .then((res) => {
              tableOptions['data'] = res['results']['data']
              tableOptions['count'] = res['count']
              let newColumns = this.setSortColumn(tableOptions)
              newColumns = this.setFilterList(res, newColumns)
              this.setState({
                'options': tableOptions,
                'columns': newColumns
              })
            })
        }
        
        if(action == 'filterChange'){
          this.getData(tableOptions)
            .then((res) => {
              tableOptions['data'] = res['results']['data']
              tableOptions['count'] = res['count']
              tableOptions['serverSideFilterList'] = tableOptions.filterList
              let newColumns = this.setFilterColumn(tableOptions)
              newColumns = this.setFilterList(res, newColumns)
              this.setState({
                'options': tableOptions,
                'columns': newColumns,
              })
            })
        }

        if(action == 'changeRowsPerPage'){
          this.getData(tableOptions)
            .then((res) => {
              tableOptions['data'] = res['results']['data']
              tableOptions['count'] = res['count']
              this.setState({'options': tableOptions})
            })
        }

        if(action == 'columnViewChange'){
          const newColumns = this.setDisplayColumn(tableOptions)
          this.setState({'columns': newColumns})
        }
        
        
        if(action == 'search'){
          setTimeout(() => {
            if(String(tableOptions.searchText)==cookies.get('text')){
              this.getData(tableOptions)
                .then((res) => {
                  tableOptions['data'] = res['results']['data']
                  tableOptions['count'] = res['count']
                  this.setState({'options': tableOptions})
                })
            }
          }, 1000)
          const cookies = new Cookies();
          cookies.set('text', tableOptions.searchText, { path: '/' });          
        }
        // console.log(action, tableOptions);
      }
    };

    if(this.state.loading){
      return (
        <Loader height={400} />
      )
    }else{
      return (
        <MUIDataTable
          title="Assets"
          data={this.state.options.data}
          className={classnames(tableStyles.small)}
          columns={this.state.columns}
          options={options}
        />
      );
    }
  }
}

export default withStyles(styles)(MilestoneTable);
