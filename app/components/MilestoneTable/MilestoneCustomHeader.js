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
    }
  }
}

function MilestoneCustomHeader(props){
  return (
    <th
      onClick={() => props.sortColumn(props.index)}
      key={props.index}
      className={classnames(props.classes.th)}
    >
      <Box display="flex" className={classnames(props.classes.customHead)}>
        <Box>
          <Box>
            {props.index % 2 == 0
              ? (
                  <Box>
                    <Icon
                      fontSize="default"
                      style={{
                        color: 'red',
                        marginBottom: '-6px',
                        marginLeft: '-8px'
                      }}
                    >
                        arrow_drop_down
                    </Icon>
                    <span style={{marginLeft: '-3px'}}>Down</span>
                  </Box>
                )
              : (
                <Box>
                  <Icon
                    fontSize="default"
                    style={{
                      color: 'green',
                      marginBottom: '-6px',
                      marginLeft: '-8px'
                    }}
                  >
                      arrow_drop_up
                  </Icon>
                  <span style={{marginLeft: '-3px'}}>Up</span>
                </Box>
              )
            }
          </Box>
          <Box style={{marginTop: '-6px'}}>
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

export default withStyles(styles)(MilestoneCustomHeader);