/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
/* eslint-disable no-alert */
import React from 'react';
import {
  Grid, Modal, Box, Typography, TextField, FormGroup, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ProgrammeCard } from '../../../Components/Cards/Cards';

const datum = [
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
  const [openProg, setOpenProg] = React.useState(false);
  const handleOpenProg = () => setOpenProg(true);
  const handleCloseProg = () => setOpenProg(false);
  const [programmeName, setProgrammeName] = React.useState('');
  const [openRes, setOpenRes] = React.useState(false);
  const handleOpenRes = () => setOpenRes(true);
  const handleCloseRes = () => setOpenRes(false);
  const [resolutionName, setResolutionName] = React.useState('');
  const [resolutionValue, setResolutionValue] = React.useState('');
  const [openProgEnroll, setOpenProgEnroll] = React.useState(false);
  const handleOpenProgEnroll = () => setOpenProgEnroll(true);
  const handleCloseProgEnroll = () => setOpenProgEnroll(false);
  const sendProgrammeNameToDatabase = () => {
    fetch('http://localhost:9000')
      .then(response => response.json())
      .then(data => alert(data.message));
    handleCloseProg();
  };

  return (
    <div>
      <Modal
        open={openProg}
        onClose={handleCloseProg}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: '8px' }}
          >
            Programme Details
          </Typography>

          <FormGroup style={{ display: 'flex', rowGap: '12px' }}>
            {/* Create a reactive variable and bind them with these
            input elements and use their data in the API */}
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={(e) => { setResolutionName(e.target.value); }}
            />
            <TextField id="Code" label="Code" variant="outlined" />
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                variant="contained"
                onClick={sendProgrammeNameToDatabase}
              >
                Save
              </Button>
            </div>
          </FormGroup>
        </Box>
      </Modal>
      <Modal
        open={openRes}
        onClose={handleCloseRes}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: '8px' }}
          >
            Resolution Details
          </Typography>

          <FormGroup style={{ display: 'flex', rowGap: '12px' }}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={(e) => { setResolutionName(e.target.value); }}
            />
            <TextField
              id="start"
              label="Content"
              variant="outlined"
              onChange={(e) => { setResolutionValue(e.target.value); }}
            />
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                variant="contained"
                onClick={handleCloseRes}
              >
                Save
              </Button>
            </div>
          </FormGroup>
        </Box>
      </Modal>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} key="Buttons">
          <div style={{ display: 'flex', justifyContent: 'start' }}>
            <Button
              variant="contained"
              size="small"
              onClick={handleOpenProg}
            >
              Add a Programme
            </Button>
            <Button
              variant="contained"
              size="small"
            >
              Enroll into a Programme
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleOpenRes}
            >
              Add a regulation
            </Button>
          </div>
        </Grid>
        <Grid container spacing={2}>
          {datum.map((item) => (
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
