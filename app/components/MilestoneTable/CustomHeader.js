/* eslint-disable */
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import classnames from 'classnames';
import {Box} from '@material-ui/core';

const styles = theme => {
  return {
    minWidth: {
      minWidth: '200px'
    },
    customHead: {
      borderSpacing: '0',
      borderCollapse: 'collapse',
      fontSize: '0.875rem',
      textAlign: 'left',
      fontWeight: '500',
      lineHeight: '1.43',
      letterSpacing: '0.01071em',
      cursor: 'pointer',
    }
  }
}

function CustomHeader(props){

  return (
    <th
      onClick={() => {
        if(props.column.sort){
          props.sortColumn(props.index)
        }
      }}
      style={{padding: '16px'}
    }>
      <Box display="flex" className={classnames(props.classes.customHead)}>
        <Box>
          <Box>
            <span>{props.name}</span>
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

export default withStyles(styles)(CustomHeader);