import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import logo from '../../assets/black_on_trans.png';
import Grid from '@mui/material/Grid2';
import MatchService from '../../services/MatchService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import NavBar from '../../components/Navbar';
const AddMatch = () => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [stadium, setStadium] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [mainReferee, setMainReferee] = useState('');
  const [firstLinesman, setFirstLinesman] = useState('');
  const [secondLinesman, setSecondLinesman] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [teams, setTeams] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const matchService = new MatchService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const teamData = await matchService.getAllTeams();
        console.log('team data is in addMatch page', teamData);
        const stadiumData = await matchService.getAllStadiums();
        setTeams(teamData);
        setStadiums(stadiumData);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    const fields = [
      homeTeam,
      awayTeam,
      stadium,
      dateTime,
      mainReferee,
      firstLinesman,
      secondLinesman,
      ticketPrice,
    ];
    return fields.every((field) => field !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fix the typo here
    if (!validateForm()) {
      setError('All fields are required.');
      return;
    }

    const homeTeamId = teams.find((team) => team.name === homeTeam)?.id;
    const awayTeamId = teams.find((team) => team.name === awayTeam)?.id;
    const stadiumId = stadiums.find((s) => s.name === stadium)?.id;

    if (!homeTeamId || !awayTeamId || !stadiumId) {
      setError('Invalid selections. Please try again.');
      return;
    }
    const matchDetails = {
      homeTeamId,
      awayTeamId,
      stadiumId,
      dateTime,
      mainReferee,
      firstLinesman,
      secondLinesman,
      ticketPrice,
    };
    try {
      const response = await matchService.addMatch(matchDetails);
      toast.success('Match added successfully!');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          maxWidth: 800,
          margin: 'auto',
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
          marginTop: '220px',
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} />

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32' }}>
            Add Match
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} columns={12}>
            {/* Home Team */}
            <Grid item size={6}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="home-team-label">Home Team</InputLabel>
                <Select
                  labelId="home-team-label"
                  id="home-team-select"
                  value={homeTeam}
                  onChange={(e) => setHomeTeam(e.target.value)}
                  label="Home Team" // Ensure the label text matches InputLabel
                >
                  {teams.map((team) => (
                    <MenuItem key={team.name} value={team.name}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Away Team */}
            <Grid item size={6}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="away-team-label">Away Team</InputLabel>
                <Select
                  labelId="away-team-label"
                  id="away-team-select"
                  value={awayTeam}
                  onChange={(e) => setAwayTeam(e.target.value)}
                  label="Away Team" // Ensure the label text matches InputLabel
                >
                  {teams.map((team) => (
                    <MenuItem key={team.name} value={team.name}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Stadium */}
            <Grid item size={6}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="stadium-label">Stadium</InputLabel>
                <Select
                  labelId="stadium-label"
                  id="stadium-select"
                  value={stadium}
                  onChange={(e) => setStadium(e.target.value)}
                  label="Stadium" // Ensure the label text matches InputLabel
                >
                  {stadiums.map((stadium) => (
                    <MenuItem key={stadium.name} value={stadium.name}>
                      {stadium.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Date and Time */}
            <Grid item size={6}>
              <TextField
                label="Date and Time"
                type="datetime-local"
                fullWidth
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Main Referee */}
            <Grid item size={6}>
              <TextField
                label="Main Referee"
                fullWidth
                value={mainReferee}
                onChange={(e) => setMainReferee(e.target.value)}
              />
            </Grid>

            {/* First Linesman */}
            <Grid item size={6}>
              <TextField
                label="First Linesman"
                fullWidth
                value={firstLinesman}
                onChange={(e) => setFirstLinesman(e.target.value)}
              />
            </Grid>

            {/* Second Linesman */}
            <Grid item size={6}>
              <TextField
                label="Second Linesman"
                fullWidth
                value={secondLinesman}
                onChange={(e) => setSecondLinesman(e.target.value)}
              />
            </Grid>

            {/* Ticket Price */}
            <Grid item size={6}>
              <TextField
                label="Ticket Price"
                type="number"
                fullWidth
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
              />
            </Grid>
          </Grid>
          {error && (
            <Typography
              variant="body1"
              color="error"
              sx={{ marginTop: '15px' }}
            >
              {error}
            </Typography>
          )}

          {/* Actions */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mr: 2, backgroundColor: '#2e7d32' }}
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddMatch;
