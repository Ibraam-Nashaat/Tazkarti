import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';
import FanService from '../services/FanService';
import Match from './viewMatchesPage/Match/match';
import NavBar from '../components/Navbar';

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [clickedTicket, setClickedTicket] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const fanService = new FanService();
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await fanService.getTickets();
        setTickets(fetchedTickets);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    fetchTickets();
  }, []);
  function formatTime(dateTime) {
    const time = dateTime.split('T')[1]; // Extract time part
    const [hours, minutes, seconds] = time.split(':'); // Split hours, minutes, and seconds

    // Extract the integer part of seconds
    const integerSeconds = Math.floor(Number(seconds));

    // Ensure 2-digit format for hours, minutes, and seconds
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(integerSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  const handleTicketClick = (ticket) => {
    setClickedTicket(ticket);
  };

  const handleCancelReservation = () => {
    const cancelReservation = async () => {
      try {
        await fanService.cancelReservation(clickedTicket.ticketId);
      } catch (error) {
        setError(error.message);
      }
    };
    cancelReservation();
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          height: 'calc(100vh - 80px)', // Adjust for root padding
          overflow: 'hidden', // Prevent vertical scrolling
          marginTop: '65px',
        }}
      >
        <Box
          sx={{
            flex: 2, // Reduced width of the left side
            overflowY: 'auto', // Make only the user list scrollable
            maxHeight: '100%',
            borderRight: '2px solid #ddd',
            paddingTop: '20px',
          }}
        >
          <NavBar />
          {tickets.map((ticket) => (
            <Match
              key={ticket.ticketId}
              id={ticket.ticketId}
              dateTime={ticket.matchDateTime}
              firstLinesman={null}
              mainReferee={null}
              secondLinesman={null}
              ticketPrice={ticket.ticketPrice}
              awayTeam={ticket.awayTeamName}
              homeTeam={ticket.homeTeamName}
              stadium={ticket.stadiumName}
              onClick={() => handleTicketClick(ticket)}
            />
          ))}
        </Box>

        <Divider orientation="vertical" flexItem sx={{ borderColor: '#ddd' }} />

        <Box
          sx={{
            flex: 2.2, // Increased width of the right side
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          {clickedTicket && (
            <div className="clicked-match-details">
              <p>
                <strong>Home Team:</strong> {clickedTicket.homeTeamName}
              </p>
              <p>
                <strong>Away Team:</strong> {clickedTicket.awayTeamName}
              </p>
              <p>
                <strong>Reservation Date:</strong>{' '}
                {clickedTicket.reservationDateTime.split('T')[0]}
              </p>
              <p>
                <strong>Reservation Time:</strong>{' '}
                {formatTime(clickedTicket.reservationDateTime)}
              </p>
              <p>
                <strong>Match Date:</strong>{' '}
                {clickedTicket.matchDateTime.split('T')[0]}
              </p>
              <p>
                <strong>Match Time:</strong>{' '}
                {clickedTicket.matchDateTime.split('T')[1]}
              </p>
              <p>
                <strong>Seat Number:</strong> {clickedTicket.seatNumber}
              </p>
              <p>
                <strong>Stadium:</strong> {clickedTicket.stadiumName}
              </p>
              <p>
                <strong>Ticket Price:</strong> ${clickedTicket.ticketPrice}
              </p>
              <div className="space-wrapper"></div>
              {error && (
                <Typography
                  sx={{ marginLeft: '100px' }}
                  variant="body2"
                  color="error"
                >
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                color="success"
                onClick={handleCancelReservation}
                sx={{ marginLeft: '150px' }}
              >
                Cancel Reservation
              </Button>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ViewTickets;
