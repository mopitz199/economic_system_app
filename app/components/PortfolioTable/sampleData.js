import classnames from 'classnames';
import Type from 'ba-styles/Typography.scss';

const percentageStyle = (value) => {
  const classes = {};
  if (value) {
    if (value.includes('-')) {
      classes[Type.textError] = true;
    }
    if (!value.includes('-')) {
      classes[Type.textSuccess] = true;
    }
  }
  return classnames(classes);
};

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
      const val = JSON.parse(option);
      return val.name;
    }
  },
  {
    name: 'asset',
    label: 'Symbol',
    initialValue: '',
    hidden: false,
    render: (option) => {
      const val = JSON.parse(option);
      return val.symbol;
    }
  },
  {
    name: 'asset',
    label: 'Type',
    initialValue: '',
    hidden: false,
    render: (option) => {
      const val = JSON.parse(option);
      return val.asset_type.charAt(0).toUpperCase() + val.asset_type.slice(1);
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
    hidden: false,
    render: (value) => `$${value}`
  },
  {
    name: 'current_value',
    label: 'Current Value',
    initialValue: '',
    hidden: false,
    render: (value) => `$${value}`
  },
  {
    name: 'performance',
    label: 'Performance',
    initialValue: '',
    hidden: false,
    render: (performance) => {
      if (performance) {
        return `${performance}%`;
      }
      return performance;
    },
    className: (value) => percentageStyle(value)
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
];
