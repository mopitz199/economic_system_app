import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import css from 'ba-styles/Table.scss';
import Type from 'ba-styles/Typography.scss';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Tooltip,
  Button,
} from '@material-ui/core';
import { Grid, FormLabel, FormControlLabel, Radio, RadioGroup, Paper, Box } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import RowReadOnly from './RowReadOnly';
import styles from './tableStyle-jss';

import EmptyIcon from '../../CustomIcons/EmptyIcon';

class MainTableForm extends React.Component {
  render() {
    const {
      title,
      classes,
      items,
      removeRow,
      editRow,
      addNew,
      anchor,
      branch
    } = this.props;
    const getItems = dataArray => dataArray.map(item => (
      <RowReadOnly
        item={item}
        removeRow={() => removeRow(item, branch)}
        key={item.get('id')}
        editRow={() => editRow(item, branch)}
        anchor={anchor}
        branch={branch}
      />
    ));

    const getHead = dataArray => dataArray.map((item, index) => {
      if (!item.hidden) {
        return (
          <TableCell padding="none" key={index.toString()} width={item.width}>{item.label}</TableCell>
        );
      }
      return false;
    });

    const renderTable = (items) => {
      if (items.size > 0) {
        return (
          <Table className={classNames(css.tableCrud, classes.table, css.stripped)}>
            <TableHead>
              <TableRow>
                { getHead(anchor) }
              </TableRow>
            </TableHead>
            <TableBody>
              {getItems(items)}
            </TableBody>
          </Table>
        );
      }
      return (
        <Box p={10}>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="center"
          >
            <EmptyIcon size={300}/>
            <Typography variant="h5" className={Type.regular}>There's no assets in your portfolio</Typography>
          </Grid>
        </Box>
      );
    };

    return (
      <div>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h6">{title}</Typography>
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            <Tooltip title="Add Item">
              <Button variant="contained" onClick={() => addNew(anchor, branch)} color="secondary" className={classes.button}>
                <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                Add New
              </Button>
            </Tooltip>
          </div>
        </Toolbar>
        <div className={classes.rootTable}>
          {renderTable(items)}
        </div>
      </div>
    );
  }
}

MainTableForm.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  anchor: PropTypes.array.isRequired,
  addNew: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  branch: PropTypes.string.isRequired,
};

export default withStyles(styles)(MainTableForm);
