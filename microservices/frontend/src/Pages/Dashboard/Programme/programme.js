/* eslint-disable no-alert */
import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
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

function App() {
  alert('A');
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Open My Custom Dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Greetings from GeeksforGeeks
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you do coding ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default function Programme() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={60} sm={6} md={4} key="Buttons">
        <div style={{ display: 'flex', justifyContent: 'start' }}>
          <button type="submit" onClick={() => App}> Add Programme </button>
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
