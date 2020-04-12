import React from 'react';
import PropTypes from 'prop-types';
import { withWidth, Typography } from '@material-ui/core';

const components = {
  sm: 'em',
  md: 'u',
  lg: 'del',
};

function WithWidth(props) {
  const { width } = props;
  const Component = components[width] || 'span';

  return (
    <Typography variant="subtitle1">
      <Component>{`Current width: ${width}`}</Component>
    </Typography>
  );
}

WithWidth.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(WithWidth);
