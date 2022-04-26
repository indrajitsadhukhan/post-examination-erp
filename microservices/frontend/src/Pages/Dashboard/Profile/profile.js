import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { CourseCard } from '../../../Components/Cards/Cards';

export default function Course({ data }) {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} key={item.name}>
          <CourseCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
}

Course.propTypes = {
  data: PropTypes.object,
};
