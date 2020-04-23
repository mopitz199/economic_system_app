import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts';

const styles = {
  chartFluid: {
    width: '100%',
    height: 450
  }
};

function LineResponsive(props) {
  const { classes } = props;
  return (
    <div className={classes.chartFluid}>
      <ResponsiveContainer>
        <LineChart
          width={800}
          height={450}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <XAxis
            dataKey={(point) => {
              return point.date
            }}
          />
          <YAxis
            domain={['dataMin', 'dataMax']}
            type="number"
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Brush dataKey="date" height={30} stroke="#8884d8" />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

LineResponsive.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LineResponsive);