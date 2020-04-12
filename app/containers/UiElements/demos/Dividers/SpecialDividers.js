import React, { Fragment, PureComponent } from 'react';
import Type from 'ba-styles/Typography.scss';
import {
  FlairedEdgesDivider,
  ContentDivider,
} from 'ba-components/Divider';

import { Typography } from '@material-ui/core';

class CommonDivider extends PureComponent {
  render() {
    return (
      <Fragment>
        <Typography variant="button" className={Type.textCenter}>Flaired Edges Divider</Typography>
        <FlairedEdgesDivider />
        <Typography variant="button" className={Type.textCenter}>Content Text Divider</Typography>
        <ContentDivider content="OR" />
      </Fragment>
    );
  }
}

export default CommonDivider;
