// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
// } from '@mui/material';
// import logo from '../../assets/black_on_trans.png';
// import Grid from '@mui/material/Grid2';
// import MatchService from '../../services/MatchService';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
// const EditMatch = () => {
//   const [homeTeam, setHomeTeam] = useState('');
//   const [awayTeam, setAwayTeam] = useState('');
//   const [stadium, setStadium] = useState('');
//   const [dateTime, setDateTime] = useState('');
//   const [mainReferee, setMainReferee] = useState('');
//   const [firstLinesman, setFirstLinesman] = useState('');
//   const [secondLinesman, setSecondLinesman] = useState('');
//   const [ticketPrice, setTicketPrice] = useState('');
//   const [teams, setTeams] = useState([]);
//   const [stadiums, setStadiums] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [matchFound,setMatchFound]=useState(false);
//   const matchService = new MatchService();

//   const validateForm = () => {
//     const fields = [
//       homeTeam,
//       awayTeam,
//       stadium,
//       dateTime,
//       mainReferee,
//       firstLinesman,
//       secondLinesman,
//       ticketPrice,
//     ];
//     return fields.every((field) => field !== '');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Fix the typo here
//     if (!validateForm()) {
//       setError('All fields are required.');
//       //add the api merge
//       return;
//     }

//     const homeTeamId = teams.find((team) => team.name === homeTeam)?.id;
//     const awayTeamId = teams.find((team) => team.name === awayTeam)?.id;
//     const stadiumId = stadiums.find((s) => s.name === stadium)?.id;

//     if (!homeTeamId || !awayTeamId || !stadiumId) {
//       setError('Invalid selections. Please try again.');
//       return;
//     }

//     const formattedDateTime = new Date(dateTime).toISOString().slice(0, 19);

//     const matchDetails = {
//       homeTeamId,
//       awayTeamId,
//       stadiumId,
//       dateTime: formattedDateTime,
//       mainReferee,
//       firstLinesman,
//       secondLinesman,
//       ticketPrice,
//     };
//     try {
//       const response = await matchService.addMatch(matchDetails);
//       toast.success('Match added successfully!');
//       setError('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="match-find">

//     </div>
//     {matchFound && (
//       <Box
//         sx={{
//           maxWidth: 800,
//           margin: 'auto',
//           mt: 4,
//           p: 3,
//           boxShadow: 3,
//           borderRadius: 2,
//           backgroundColor: 'white',
//         }}
//       >
//         <ToastContainer position="top-right" autoClose={3000} />
    
//         <Box sx={{ textAlign: 'center', mb: 3 }}>
//           <img src={logo} alt="Logo" style={{ width: '120px' }} />
//           <Typography variant="h5" gutterBottom>
//             Edit Match
//           </Typography>
//         </Box>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                 <InputLabel id="home-team-label">Home Team</InputLabel>
//                 <Select
//                   labelId="home-team-label"
//                   id="home-team-select"
//                   value={homeTeam}
//                   onChange={(e) => setHomeTeam(e.target.value)}
//                   label="Home Team"
//                 >
//                   {teams.map((team) => (
//                     <MenuItem key={team.name} value={team.name}>
//                       {team.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             {/* Repeat similar structure for other fields */}
//           </Grid>
    
//           {error && (
//             <Typography variant="body1" color="error" sx={{ marginTop: '15px' }}>
//               {error}
//             </Typography>
//           )}
    
//           <Box sx={{ textAlign: 'center', mt: 3 }}>
//             <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
//               Confirm
//             </Button>
//           </Box>
//         </form>
//       </Box>
//       )}
//   );
// };

// export default EditMatch;
