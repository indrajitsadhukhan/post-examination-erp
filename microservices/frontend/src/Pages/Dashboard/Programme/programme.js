/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
/* eslint-disable no-alert */
import React from 'react';
import {
  Grid, Modal, Box, Typography, TextField, FormGroup, Button, Menu, MenuItem,
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

const mockData1 = [
  {
    label: 'Bachelor of Technology',
    value: 'BTECH',
  },
  {
    label: 'Master of Technology',
    value: 'MTECH',
  },
];

const mockData2 = [
  {
    label: 'Regulation 2019',
    value: 'R2019',
  },
  {
    label: 'Regulation 2015',
    value: 'R2015',
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
  /* The above hooks are for the modal box adding programme */
  const [programmeName, setProgrammeName] = React.useState('');
  /* The above hook is to store the name of new programme */
  const [openProgInst, setOpenProgInst] = React.useState(false);
  const handleOpenProgInst = () => setOpenProgInst(true);
  const handleCloseProgInst = () => setOpenProgInst(false);
  /* The above hooks are for the modal box adding programme instance */
  const [progInstParentName, setProgInstParentName] = React.useState('');
  const [progInstRegulation, setProgInstRegulation] = React.useState('');
  const [progInstUniqueName, setProgInstUniqueName] = React.useState('');
  const [progInstStartDate, setProgInstStartDate] = React.useState('');
  /* The above hooks store the details of the new programme instance */
  const [openReg, setOpenReg] = React.useState(false);
  const handleOpenReg = () => setOpenReg(true);
  const handleCloseReg = () => setOpenReg(false);
  /* The above hooks are for the modal box adding regulution */
  const [regulationName, setRegulationName] = React.useState('');
  const [regulationValue, setRegulationValue] = React.useState('');
  /* The above hooks store the details of the new regulation */
  const [openProgEnroll, setOpenProgEnroll] = React.useState(false);
  const handleOpenProgEnroll = () => setOpenProgEnroll(true);
  const handleCloseProgEnroll = () => setOpenProgEnroll(false);
  /* The above hooks are for the modal box enrolling into a programme instance */
  const [progEnrollInstName, setProgEnrollInstName] = React.useState('');
  const [progEnrollUserId, setProgEnrollUserId] = React.useState('');
  const [progEnrollStartDate, setProgEnrollStartDate] = React.useState('');
  /* The above hooks are for entering enrollment details */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
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
        {/* The modal box for add-programme command */}
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
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={(e) => { setProgrammeName(e.target.value); }}
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
        open={openProgInst}
        onClose={handleCloseProgInst}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* The modal box for add programme instance command */}
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: '8px' }}
          >
            Programme Instance Details
          </Typography>

          <FormGroup style={{ display: 'flex', rowGap: '12px' }}>
            <TextField
              id="name"
              select
              label="Name of Parent Programme"
              value={progInstParentName}
              onChange={(e) => { setProgInstParentName(e.target.value); }}
              helperText="Please select the parent programme name"
            >
              {mockData1.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="Unique Name"
              label="Enter a Unique Identifier"
              variant="outlined"
              onChange={(e) => { setProgInstUniqueName(e.target.value); }}
            />
            <TextField
              id="regulation"
              select
              label="Name of Regulation"
              value={progInstRegulation}
              onChange={(e) => { setProgInstRegulation(e.target.value); }}
              helperText="Please select the relevant Regulation"
            >
              {mockData2.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="startdate"
              label="Enter the start date"
              type="date"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              value={progInstStartDate}
              onChange={(e) => { setProgInstStartDate(e.target.value); }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                variant="contained"
                onClick={handleCloseProgInst}
              >
                Save
              </Button>
            </div>
          </FormGroup>
        </Box>
      </Modal>
      <Modal
        open={openReg}
        onClose={handleCloseReg}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* The modal box for add-regulation command */}
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: '8px' }}
          >
            Regulation Details
          </Typography>

          <FormGroup style={{ display: 'flex', rowGap: '12px' }}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={(e) => { setRegulationName(e.target.value); }}
            />
            <TextField
              id="start"
              label="Content"
              variant="outlined"
              onChange={(e) => { setRegulationValue(e.target.value); }}
            />
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                variant="contained"
                onClick={handleCloseReg}
              >
                Save
              </Button>
            </div>
          </FormGroup>
        </Box>
      </Modal>
      <Modal
        open={openProgEnroll}
        onClose={handleCloseProgEnroll}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* The modal box for enroll-programme command */}
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
            <TextField
              id="Programme Instance name"
              select
              label="Name of Programme instance"
              value={progEnrollInstName}
              onChange={(e) => { setProgEnrollInstName(e.target.value); }}
              helperText="Please select the programme instance"
            >
              {mockData1.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="University Id"
              label="University Id of Enroller"
              variant="outlined"
              onChange={(e) => { setProgEnrollUserId(e.target.value); }}
            />
            <TextField
              id="startdate"
              label="Enter the start date"
              type="date"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              value={progEnrollStartDate}
              onChange={(e) => { setProgEnrollStartDate(e.target.value); }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                variant="contained"
                onClick={handleCloseProgEnroll}
              >
                OK
              </Button>
            </div>
          </FormGroup>
        </Box>
      </Modal>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenProg}>Add a Program</MenuItem>
        <MenuItem onClick={handleOpenProgInst}>Add a Programme Instance</MenuItem>
        <MenuItem onClick={handleOpenReg}>Add a Regulation</MenuItem>
        <MenuItem onClick={handleOpenProgEnroll}>Enroll into a Programme</MenuItem>
      </Menu>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} key="Buttons">
          <div style={{ display: 'flex' }}>
            <Button
              variant="contained"
              size="small"
              onClick={handleMenuClick}
            >
              Menu
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
