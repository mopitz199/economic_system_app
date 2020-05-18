/* eslint-disable */
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import classnames from 'classnames';
import {Box} from '@material-ui/core';

const styles = theme => {
  return {
    customHead: {
      borderSpacing: '0',
      borderCollapse: 'collapse',
      fontSize: '0.875rem',
      textAlign: 'left',
      fontWeight: '500',
      lineHeight: '1.43',
      letterSpacing: '0.01071em',
    },
    th: {
      cursor: 'pointer',
      padding: '16px',
    },
    milestoneArrowIcon:{
      marginBottom: '-6px',
      marginLeft: '-8px'
    },
    redIcon: {
      color: 'red',
    },
    greenIcon: {
      color: 'green',
    },
    milestoneAdjetiveText:{
      marginLeft: '-3px'
    }
  }
}

function splitName(name){
  if(name.includes("Down")){
    return {
      "firstPart": "Down",
      "secondPart": name.split("Down ")[1]
    }
  }else if(name.includes("Up")){
    return {
      "firstPart": "Up",
      "secondPart": name.split("Up ")[1]
    }
  }else{
    return null
  }
}

function MilestoneCustomHeader(props){
  const nameData = splitName(props.name)
  return (
    <th
      onClick={() => props.sortColumn(props.index)}
      key={props.index}
      className={classnames(props.classes.th)}
    >
      <Box display="flex" className={classnames(props.classes.customHead)}>
        <Box>
          <Box>
            <Box>
              <Icon
                fontSize="default"
                className={classnames(
                  props.classes.milestoneArrowIcon,
                  nameData.firstPart=="Down" ? props.classes.redIcon : props.classes.greenIcon
                )}
              >
                {nameData.firstPart=="Down" ? "arrow_drop_down" : "arrow_drop_up"}
              </Icon>
              <span
                className={classnames(props.classes.milestoneAdjetiveText)}
              >
                {nameData.firstPart}
              </span>
            </Box>
          </Box>
          <Box style={{marginTop: '-6px'}}>
            <span>{nameData.secondPart}</span>
            {props.column.hint
              ? (
                <Tooltip title={props.column.hint}>
                  <span style={{verticalAlign: 'bottom', marginLeft: '3px'}}>
                    <HelpIcon fontSize="small"/>
                  </span>
                </Tooltip>
              )
              : null
            }
          </Box>
        </Box>
        <Box alignSelf="center">
          {props.column.sortDirection!='none'
            ? <TableSortLabel active={props.column.sortDirection !== null} direction={props.column.sortDirection || "asc"}/>
            : null
          }
        </Box>
      </Box>
    </th>
  )
}

export default withStyles(styles)(MilestoneCustomHeader);