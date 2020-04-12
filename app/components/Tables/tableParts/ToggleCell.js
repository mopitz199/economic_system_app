import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from 'ba-styles/Table.scss';

import { TableCell, FormControlLabel, Switch } from '@material-ui/core';

class ToggleCell extends React.Component {
  state = {
    isChecked: this.props.cellData.value
  };

  handleChange = event => {
    this.setState({ isChecked: event.target.checked });
    this.props.updateRow(event, this.props.branch);
  };

  render() {
    const {
      cellData,
      edited,
    } = this.props;
    return (
      <TableCell className={css.toggleCell} padding="none" textalign="center">
        <div className={classNames(css.coverReadonly, !edited ? css.show : '')} />
        <FormControlLabel
          control={(
            <Switch
              name={cellData.type}
              id={cellData.id.toString()}
              className={css.crudInput}
              checked={this.state.isChecked}
              onChange={this.handleChange}
              value={cellData.value.toString()}
            />
          )}
        />
      </TableCell>
    );
  }
}

ToggleCell.propTypes = {
  cellData: PropTypes.object.isRequired,
  updateRow: PropTypes.func.isRequired,
  edited: PropTypes.bool.isRequired,
  branch: PropTypes.string.isRequired,
};

export default ToggleCell;
