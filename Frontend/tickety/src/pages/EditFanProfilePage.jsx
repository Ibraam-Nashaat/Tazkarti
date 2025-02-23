import React, { useEffect, useState } from 'react';
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
import NavBar from '../components/Navbar';
import FanService from '../services/FanService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fanService = new FanService();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const profileData = await fanService.getProfileData();
        setFormData({
          username: profileData.username || '',
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          email: profileData.email || '',
          password: '', // Keep password fields empty
          confirmPassword: '',
          gender: profileData.gender || '',
          dateOfBirth: profileData.birthDate || '', // Use the date directly
          city: profileData.city || '',
          address: profileData.address || '',
          role: profileData.role || '',
        });
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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
    const formattedDate = new Date(formData.dateOfBirth)
      .toISOString()
      .split('T')[0]; // yyyy-mm-dd format

    const profileData = {
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      city: formData.city,
      address: formData.address,
      birthDate: formattedDate,
    };

    try {
      const response = await fanService.editProfileData(profileData);
      toast.success('User profile updated successfully');
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
        <ToastContainer position="top-right" autoClose={3000} />

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
