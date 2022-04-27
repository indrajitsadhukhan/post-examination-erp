import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { ProgrammeCard } from '../../../Components/Cards/Cards';

const data = [
  {
    name: 'Btech CST 2018',
    currentSem: 8,
    totalSem: 8,
    cgpa: 9.6,
    startDate: '21/06/2018',
  },
  {
    name: 'Mtech CST 2018',
    currentSem: 1,
    totalSem: 4,
    cgpa: 6.7,
    startDate: '21/06/2018',

  },
];

export default function Programme() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={60} sm={6} md={4} key="Buttons">
        <div style={{ display: 'flex', justifyContent: 'start' }}>
          <button type="submit"> Add Programme </button>
          <button type="submit"> Enroll into a Programme </button>
        </div>
      </Grid>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.name}>
            <ProgrammeCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

Programme.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
};
