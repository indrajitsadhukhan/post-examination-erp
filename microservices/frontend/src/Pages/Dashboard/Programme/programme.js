/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import React from 'react';
import {
  Grid, Modal, Box, Typography, TextField, FormGroup,
} from '@mui/material';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Programme() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginBottom: '8px' }}>
            Programme Details
          </Typography>

          <FormGroup style={{ display: 'flex', rowGap: '12px' }}>
            {/* Create a reactive variable and bind them with these
            input elements and use their data in the API */}
            <TextField id="name" label="Name" variant="outlined" />
            <TextField id="start" label="More info" variant="outlined" />
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button variant="contained" disableElevation>Save</Button>
            </div>
          </FormGroup>
        </Box>
      </Modal>

      <Grid container spacing={2}>
        <Grid item xs={60} sm={6} md={4} key="Buttons">
          <div style={{ display: 'flex', justifyContent: 'start' }}>
            <button type="submit" onClick={handleOpen}>
              Add Programme
            </button>
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
    </div>
  );
}

Programme.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
};
