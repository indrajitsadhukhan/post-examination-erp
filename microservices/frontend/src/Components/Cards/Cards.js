/* eslint-disable */
import React from 'react';
import {
  Card, CardActionArea, CardContent, CircularProgress,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ProgrammeCard({
  name, startDate, currentSem, totalSem, cgpa,
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" fontWeight={600} display='flex' justifyContent='flex-start'>
            {name}
          </Typography>
            <Typography>
                Program Start: {startDate}
            </Typography>
            <Typography>
                Current Semester: {currentSem}
            </Typography>
            <Typography>
                CGPA: {cgpa}
            </Typography>
            <Box display='flex' alignItems='center' columnGap={3}>
                <Box>
                    <Typography>
                        Percentage completed:
                    </Typography>
                </Box>
                <Box display='flex' justifyContent='center' alignItems='center' >
                    <CircularProgress variant="determinate" value={(currentSem * 100) / totalSem} />
                    <Typography variant="button2" position='absolute'>{currentSem * 100 / totalSem}%</Typography>
                </Box>
            </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export {
  // eslint-disable-next-line import/prefer-default-export
  ProgrammeCard,
};
