import { fromJS, List, Map as CustomMap } from 'immutable';

export const anchorTable = [
  {
    name: 'id',
    label: 'Id',
    initialValue: '',
    hidden: true
  },
  {
    name: 'asset',
    label: 'Name',
    initialValue: '',
    hidden: false,
    render: (option) => {
      try{
        return option.get('name')
      }catch {
        try {
          let val = JSON.parse(option)
          return val.name
        }
        catch(error){
          try{
            return val.name
          }catch{
            return option
          }
        }
      }
    }
  },
  {
    name: 'asset',
    label: 'Symbol',
    initialValue: '',
    hidden: false,
    render: (option) => {
      try{
        return option.get('symbol')
      }catch {
        try {
          let val = JSON.parse(option)
          return val.symbol
        }
        catch(error){
          try{
            return val.symbol
          }catch{
            return option
          }
        }
      }
    }
  },
  {
    name: 'asset',
    label: 'Type',
    initialValue: '',
    hidden: false,
    render: (option) => {
      try{
        return option.get('asset_type')
      }catch {
        try {
          let val = JSON.parse(option)
          return val.asset_type
        }
        catch(error){
          try{
            return val.asset_type
          }catch{
            return option
          }
        }
      }
    }
  },
  {
    name: 'quantity',
    label: 'Quantity',
    initialValue: '',
    hidden: false
  },
  {
    name: 'purchase_value',
    label: 'Purchase Value',
    initialValue: '',
    hidden: false
  },
  {
    name: 'current_value',
    label: 'Current Value',
    initialValue: '',
    hidden: false
  },
  {
    name: 'performance',
    label: 'Performance',
    initialValue: '',
    hidden: false
  },
  {
    name: 'edited',
    label: '',
    initialValue: '',
    hidden: true
  },
  {
    name: 'action',
    label: 'Action',
    initialValue: '',
    hidden: false
  },
]

export const dataApi = [
  {
    id: '1',
    asset: {
      name: 'asset1',
      symbol: 'BTC',
      asset_type: 'crypto'
    },
    type: 'option2',
    quantity: 'option1',
    purchase_value: false,
    current_value: true,
    performance: 'Lorem ipsum dolor sit amet',
  },
  {
    id: '2',
    asset: {
      name: 'asset2',
      symbol: 'BTC',
      asset_type: 'crypto'
    },
    type: 'option2',
    quantity: 'option1',
    purchase_value: false,
    current_value: true,
    performance: 'Lorem ipsum dolor sit amet',
  }
];
