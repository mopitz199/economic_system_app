import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import css from 'ba-styles/Table.scss';
import { TableCell } from '@material-ui/core';

class DatePickerCell extends React.Component {
  state = {
    event: {
      target: {
        name: this.props.cellData.type, // eslint-disable-line
        value: this.props.cellData.value, // eslint-disable-line
      }
    }
  }

  handleDateChange = date => {
    const { event } = this.state;
    const { branch, updateRow } = this.props;
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
      <TableCell padding="none" className="text-center" textalign="center">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            clearable
            name={cellData.type}
            className={css.crudInput}
            format="DD/MM/YYYY"
            placeholder="10/10/2018"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            value={event.target.value}
            disabled={!edited}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
          />
        </MuiPickersUtilsProvider>
      </TableCell>
    );
  }
}

DatePickerCell.propTypes = {
  cellData: PropTypes.object.isRequired,
  updateRow: PropTypes.func.isRequired,
  edited: PropTypes.bool.isRequired,
  branch: PropTypes.string.isRequired,
};

export default DatePickerCell;
