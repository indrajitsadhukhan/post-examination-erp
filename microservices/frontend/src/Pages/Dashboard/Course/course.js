import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { CourseCard } from '../../../Components/Cards/Cards';

const data = [
  {
    name: 'Artifical Intelligence',
    code: 'CS801',
    instructor: 'Somnath Pal',
  },
  {
    name: 'Computer Vision',
    code: 'CS802',
    instructor: 'Sekhar Mandal',
  },
  {
    name: 'Final Project',
    code: 'CSSMTH',
    instructor: 'Manas Hira',
  },
];

export default function Course() {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.name}>
          <CourseCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
}

Course.propTypes = {
  data: PropTypes.object,
};
