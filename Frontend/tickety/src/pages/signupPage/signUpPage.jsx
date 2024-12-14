import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirection
import logo from '../../assets/black_on_trans.png';
import Grid from '@mui/material/Grid2';
import AuthService from '../../services/AuthService'; // Make sure to import AuthService

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: '',
    city: '',
    address: '',
    role: '',
  });
  const [error, setError] = useState(null); // State to store error message
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUpClick = async () => {
    try {
      const authService = new AuthService();
      const response = await authService.signUp(formData);
      // On successful sign up, navigate to another page (e.g., login page)
      navigate('/signin'); // Update this with the actual path you want to redirect to
    } catch (error) {
      // Set the error message to display in the UI
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        gap: '16px',
        maxWidth: '900px',
        margin: 'auto',
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <img src={logo} alt="Logo" style={{ width: '150px' }} />
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>

      {/* Error Message Display */}
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      <Grid container spacing={2} columns={12}>
        <Grid item size={6}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item size={6}>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item size={6}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item size={6}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item size={6}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item size={6}>
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
              required
            >
              <MenuItem value="" disabled>
                Select your gender
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item size={6}>
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
              required
            >
              <MenuItem value="" disabled>
                Select your Role
              </MenuItem>
              <MenuItem value="fan">Fan</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item size={6}>
          <TextField
            label="Date of Birth"
            variant="outlined"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item size={6}>
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item size={6}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ marginTop: '16px' }}
        onClick={handleSignUpClick}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupPage;
