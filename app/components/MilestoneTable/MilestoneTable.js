/* eslint-disable */
import React from 'react';
import MUIDataTable from 'mui-datatables';
import classnames from 'classnames';

import Type from 'ba-styles/Typography.scss';

class AdvFilter extends React.Component {

  state = {
    columns: [
      {
        name: 'Name',
      },
      {
        name: 'Symbol'
      },
      {
        name: 'Type'
      },
      {
        name: 'Sector'
      },
      {
        name: 'Industry'
      },
      {
        name: 'Crisis 2000(%)',
        options: {
          setCellProps: (value) => {
            return this.percentageStyle(value)
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
          setCellProps: (value) => {
            return this.percentageStyle(value)
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
          setCellProps: (value) => {
            return this.percentageStyle(value)
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
    data: [
      ['Bitcoin', 'BTC', 'Cryptos', null, null, null, 1000, -70],
      ['Apple', 'AAPL', 'Stocks', -30, 250, -40, 323, -20],
    ]
  }

  percentageStyle = (value) => {
    let classes = {}
    if(value){
      if(value.includes('-')){
        classes[Type.textError] = true
      }
      if(!value.includes('-')){
        classes[Type.textSuccess] = true
      }
    }
    return {className: classnames(classes)}
  }

  componentWillMount(){
    fetch(
      'https://economicapp.io/api/chart/chart/milestones/',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 26704736d3a5c8712dc149fb67643608f0397267'
        }
      }
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
      rowsPerPage: 10,
      page: 1,
    };
    return (
      <MUIDataTable
        title="Assets"
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default AdvFilter;
