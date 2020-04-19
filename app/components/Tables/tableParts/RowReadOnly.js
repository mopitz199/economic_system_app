import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import css from 'ba-styles/Table.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/BorderColor';

import { TableCell, IconButton } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
});

class RowReadOnly extends React.Component {
  render() {
    const {
      anchor,
      classes,
      item,
      removeRow,
      editRow,
      branch
    } = this.props;
    const eventDel = () => {
      removeRow(item, branch);
    };
    const eventEdit = () => {
      editRow(item, branch);
    };
    const renderCell = dataArray => dataArray.map((itemCell, index) => {
      if (itemCell.name !== 'action' && !itemCell.hidden) {
        let renderedValue = item.get(itemCell.name) !== undefined ? item.get(itemCell.name).toString() : ''
        if(itemCell.render !== undefined){
          renderedValue = itemCell.render(item.get(itemCell.name))
        }
        let className = null;
        if(itemCell.className){
          className = itemCell.className(renderedValue)
        }
        return (
          <TableCell padding="none" key={index.toString()} className={className}>
            {renderedValue}
          </TableCell>
        );
      }
      return false;
    });
    return (
      <tr>
        {renderCell(anchor)}
        <TableCell padding="none">
          <IconButton
            onClick={() => eventEdit(this)}
            className={classNames((item.get('edited') ? css.hideAction : ''), classes.button)}
            aria-label="Edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => eventDel(this)}
            className={classes.button}
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </tr>
    );
  }
}

RowReadOnly.propTypes = {
  anchor: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  removeRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  branch: PropTypes.string.isRequired,
};

export default withStyles(styles)(RowReadOnly);
