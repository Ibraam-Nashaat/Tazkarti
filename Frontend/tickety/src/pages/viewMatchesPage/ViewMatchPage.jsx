import React, { useState, useEffect } from 'react';
import './ViewMatchPage.css';
import logo from '../../assets/black_on_trans.png';
import apiGetMatches from '../../apis/MatchApis/getMatches';
import Button from '@mui/material/Button';
import Match from './Match/match';
import NavBar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Box, Divider } from '@mui/material';

const ViewMatchPage = () => {
  const [matches, setMatches] = useState([]);
  const [clickedMatch, setClickedMatch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const fetchedMatches = await apiGetMatches();
        console.log('Items from API:', fetchedMatches);
        setMatches(fetchedMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    fetchMatches();
  }, []);

  const handleEditMatch = () => {
    const probeData = { clickedMatch };
    navigate('/editmatch', { state: probeData }); // Pass the probe in the state
  };

  const handleBookMatch = () => {
    const probeData = { clickedMatch };
    navigate('/reservematch', { state: probeData }); // Pass the probe in the state
  };

  const handleMatchClick = (match) => {
    setClickedMatch(match);
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
          {matches.map((match) => (
            <Match
              key={match.matchId}
              id={match.matchId}
              dateTime={match.dateTime}
              firstLinesman={match.firstLinesman}
              mainReferee={match.mainReferee}
              secondLinesman={match.secondLinesman}
              ticketPrice={match.ticketPrice}
              awayTeam={match.awayTeamName}
              homeTeam={match.homeTeamName}
              stadium={match.stadiumName}
              onClick={() => handleMatchClick(match)}
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
          {clickedMatch && (
            <div className="clicked-match-details">
              <p>
                <strong>Home Team:</strong> {clickedMatch.homeTeamName}
              </p>
              <p>
                <strong>Away Team:</strong> {clickedMatch.awayTeamName}
              </p>
              <p>
                <strong>Date:</strong> {clickedMatch.dateTime.split('T')[0]}
              </p>
              <p>
                <strong>Time:</strong> {clickedMatch.dateTime.split('T')[1]}
              </p>
              <p>
                <strong>Stadium:</strong> {clickedMatch.stadiumName}
              </p>
              <p>
                <strong>Main Referee:</strong> {clickedMatch.mainReferee}
              </p>
              <p>
                <strong>First Linesman:</strong> {clickedMatch.firstLinesman}
              </p>
              <p>
                <strong>Second Linesman:</strong> {clickedMatch.secondLinesman}
              </p>
              <p>
                <strong>Ticket Price:</strong> ${clickedMatch.ticketPrice}
              </p>
              <div className="space-wrapper"></div>
              {localStorage.getItem('role') === 'MANAGER' && (
                <Button className="book-button" onClick={handleBookMatch}>
                  View Seats
                </Button>
              )}
              {localStorage.getItem('role') === 'FAN' && (
                <Button className="book-button" onClick={handleBookMatch}>
                  Book Ticket
                </Button>
              )}
              {localStorage.getItem('role') === 'MANAGER' && (
                <Button
                  className="book-button"
                  onClick={handleEditMatch}
                  sx={{ marginTop: '10px' }}
                >
                  Edit Match
                </Button>
              )}
            </div>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ViewMatchPage;
