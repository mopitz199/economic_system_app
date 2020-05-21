import React from 'react';
import classNames from 'classnames';
import AsyncSelect from 'react-select/async';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

import {
  InputLabel,
} from '@material-ui/core';

import {server, headers} from '../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 8,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function NoOptionsMessage(props) {
  const { selectProps, innerProps, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.noOptionsMessage}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}

function Option(props) {
  const {
    innerRef,
    isFocused,
    isSelected,
    innerProps,
    children
  } = props;
  return (
    <MenuItem
      ref={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}

function Placeholder(props) {
  const { selectProps, innerProps, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

function SingleValue(props) {
  const { selectProps, children, innerProps } = props;
  return (
    <Typography className={selectProps.classes.singleValue} {...innerProps}>
      {children}
    </Typography>
  );
}

function ValueContainer(props) {
  const { selectProps, children } = props;
  return <div className={selectProps.classes.valueContainer}>{children}</div>;
}

function MultiValue(props) {
  const {
    children,
    selectProps,
    removeProps,
    isFocused
  } = props;
  return (
    <Chip
      tabIndex={-1}
      label={children}
      className={classNames(selectProps.classes.chip, {
        [selectProps.classes.chipFocused]: isFocused,
      })}
      onDelete={removeProps.onClick}
      deleteIcon={<CancelIcon {...removeProps} />}
    />
  );
}

function Menu(props) {
  const { selectProps, innerProps, children } = props;
  return (
    <Paper square className={selectProps.classes.paper} {...innerProps}>
      {children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

export default function AssetSearch(props) {
  const classes = useStyles();
  const theme = useTheme();
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  const processSearch = (data, inputValue) => {
    //debugger
    let options = []
    data.forEach(asset => {
      inputValue = inputValue.toLowerCase()
      options.push({
        'label': getLabelFromJson(asset),
        'value': JSON.stringify({
          'id': asset.id,
          'name': asset.name,
          'symbol': asset.symbol,
          'asset_type': asset.asset_type
        }),
      })
    });
    return options
  };

  const loadOptions = (inputValue, callback) => {
    console.log("loading options")
    fetch(
      `${server}/api/asset/search/?q=${inputValue}`,
      {headers}
    )
      .then(res => res.json())
      .then(res => callback(processSearch(res['results'], inputValue)))
  };

  const getLabelFromJson = (asset) => {
    return `${asset.name} (${asset.symbol}) (${asset.asset_type})`
  };

  const getLabelFromString = (assetStr) => {
    try{
      const asset = JSON.parse(assetStr)
      return getLabelFromJson(asset);
    }catch{
      return assetStr;
    }
  }

  return (
    <div className={classes.root}>
      <NoSsr>
        <InputLabel htmlFor="uncontrolled-native">Asset</InputLabel>
        <AsyncSelect
          value={{
            'label': getLabelFromString(props.value),
            'value': props.value
          }}
          name='asset'
          inputId="react-select-multiple"
          components={components}
          classes={classes}
          placeholder=""
          styles={selectStyles}
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          onChange = {(option) => props.onChange(option.value)}
        />
      </NoSsr>
    </div>
  );
}
