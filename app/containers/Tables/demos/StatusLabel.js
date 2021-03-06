import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import tableStyles from 'ba-styles/Table.scss';
import messageStyles from 'ba-styles/Messages.scss';
import progressStyles from 'ba-styles/Progress.scss';

import {
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  chip: {
    margin: theme.spacing(1),
    fontWeight: 'bold',
    color: '#FFF'
  },
});

let id = 0;
function createData(name, progress, status) {
  id += 1;
  return {
    id,
    name,
    progress,
    status,
  };
}

const data = [
  createData('Frozen yoghurt', 24, 'Error'),
  createData('Ice cream sandwich', 37, 'Warning'),
  createData('Eclair', 24, 'Info'),
  createData('Cupcake', 67, 'Default'),
  createData('Gingerbread', 89, 'Success'),
];

function StatusLabel(props) {
  const { classes } = props;
  const getStatus = status => {
    switch (status) {
      case 'Error': return messageStyles.bgError;
      case 'Warning': return messageStyles.bgWarning;
      case 'Info': return messageStyles.bgInfo;
      case 'Success': return messageStyles.bgSuccess;
      default: return messageStyles.bgDefault;
    }
  };
  const getProgress = status => {
    switch (status) {
      case 'Error': return progressStyles.bgError;
      case 'Warning': return progressStyles.bgWarning;
      case 'Info': return progressStyles.bgInfo;
      case 'Success': return progressStyles.bgSuccess;
      default: return progressStyles.bgDefault;
    }
  };
  return (
    <Paper className={classes.root}>
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h6">Nutrition</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, tableStyles.stripped)}>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => ([
            <TableRow key={n.id}>
              <TableCell>{n.name}</TableCell>
              <TableCell align="right">
                <LinearProgress variant="determinate" className={getProgress(n.status)} value={n.progress} />
              </TableCell>
              <TableCell>
                <Chip label={n.status} className={classNames(classes.chip, getStatus(n.status))} />
              </TableCell>
            </TableRow>
          ])
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

StatusLabel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatusLabel);
