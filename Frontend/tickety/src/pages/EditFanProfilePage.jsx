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
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import Grid from '@mui/material/Grid2';
import AuthService from '../services/AuthService';
import NavBar from '../components/Navbar';

const EditFanProfilePage = () => {
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

  const authService = new AuthService();

  // Validation function
  const validateForm = () => {
    // Check if all required fields are filled
    for (const field in formData) {
      if (formData[field] === '' && field !== 'address') {
        setError(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
        return false;
      }
    }
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleEditClick = async () => {
    // First, validate the form before sending to the backend
    if (!validateForm()) {
      return; // If validation fails, don't proceed
    }

    try {
      const response = await authService.signUp(formData);
      navigate('/signin'); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <NavBar />

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
          marginTop: '160px',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: '#2e7d32', marginTop: '20px' }}
        >
          Profile
        </Typography>

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
              disabled
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
              disabled
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
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              name="confirmPassword"
              value={formData.confirmPassword}
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
            <TextField
              label="Role"
              variant="outlined"
              type="role"
              fullWidth
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled
            />
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

          <Grid item size={12}>
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

        {/* Error Message Display */}
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: '16px', backgroundColor: '#2e7d32' }}
          onClick={handleEditClick}
        >
          Edit
        </Button>

      </Box>
    </>
  );
};

export default EditFanProfilePage;
