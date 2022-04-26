import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { ProgrammeCard } from '../../../Components/Cards/Cards';

export default function Programme({ data }) {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} key={item.name}>
          <ProgrammeCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
}

Programme.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
};
