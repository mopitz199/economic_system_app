import React from 'react';
import PropTypes from 'prop-types';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import css from 'ba-styles/Table.scss';

import { TableCell, InputAdornment, Icon, IconButton } from '@material-ui/core';

class TimePickerCell extends React.Component {
  state = {
    event: {
      target: {
        name: this.props.cellData.type, // eslint-disable-line
        value: this.props.cellData.value, // eslint-disable-line
      }
    }
  }

  handleTimeChange = date => {
    const { event } = this.state;
    const { updateRow, branch } = this.props;
    event.target.value = date;
    updateRow(event, branch);
  }

  render() {
    const {
      edited,
      cellData
    } = this.props;
    const { event } = this.state;
    return (
      <TableCell padding="none">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <TimePicker
            name={cellData.type}
            className={css.crudInput}
            mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
            placeholder="08:00 AM"
            value={event.target.value}
            disabled={!edited}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Icon>access_time</Icon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={this.handleTimeChange}
          />
        </MuiPickersUtilsProvider>
      </TableCell>
    );
  }
}

TimePickerCell.propTypes = {
  cellData: PropTypes.object.isRequired,
  updateRow: PropTypes.func.isRequired,
  edited: PropTypes.bool.isRequired,
  branch: PropTypes.string.isRequired,
};

export default TimePickerCell;
