import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LocationOnIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Match = ({
  id,
  dateTime,
  firstLinesman,
  mainReferee,
  secondLinesman,
  ticketPrice,
  awayTeam,
  homeTeam,
  stadium,
  onClick,
}) => {
  const formatDateTime = (dateTime) => {
    const [date, time] = dateTime.split('T'); // Split by 'T'
    return { date, time };
  };

  const { date, time } = formatDateTime(dateTime);
  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9',
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
      }}
      onClick={onClick}
    >
      <Box textAlign="center" mb={2}>
        <Typography variant="h6" component="div">
          {homeTeam} vs {awayTeam}
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item display="flex" alignItems="center">
          <LocationOnIcon color="action" sx={{ marginRight: 1 }} />
          <Typography variant="body1">{stadium}</Typography>
        </Grid>

        <Grid item display="flex" alignItems="center">
          <CalendarMonthIcon color="action" sx={{ marginRight: 1 }} />
          <Box>
            <Typography variant="body1" textAlign="right">
              {date}
            </Typography>
            <Typography variant="body2" color="textSecondary" textAlign="right">
              Time: {time}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Match;
