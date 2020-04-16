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
          return val.asset_type.charAt(0).toUpperCase() + val.asset_type.slice(1)
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
    asset: '{"name": "Bitcoin","symbol": "BTC","asset_type": "cryptos"}',
    quantity: 0.5123,
    purchase_value: 3423.45,
    current_value: 4545.23,
    performance: '-10%',
  },
  {
    id: '2',
    asset: '{"name": "Cardano","symbol": "ADA","asset_type": "cryptos"}',
    quantity: 65000,
    purchase_value: 0.03456,
    current_value: 0.024322,
    performance: '18.45%',
  }
];
