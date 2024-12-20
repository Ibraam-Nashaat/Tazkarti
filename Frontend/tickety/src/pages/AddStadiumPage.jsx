import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import Grid from '@mui/material/Grid2';
import AuthService from '../services/AuthService';
import NavBar from '../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import ManagerService from '../services/ManagerService';

const AddStadiumPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    rows: '',
    rowSeats: '',
  });
  const [error, setError] = useState(null); // State to store error message
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const managerService = new ManagerService();

  // Validation function
  const validateForm = () => {
    // Check if all required fields are filled
    for (const field in formData) {
      if (formData[field] === '') {
        setError(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
        return false;
      }
    }
    return true;
  };

  const handleAddStadiumClick = async () => {
    // First, validate the form before sending to the backend
    if (!validateForm()) {
      return; // If validation fails, don't proceed
    }
    const stadiumDetails = {
      name: formData.name,
      city: formData.city,
      address: formData.address,
      rows: formData.rows,
      rowSeats: formData.rowSeats,
    };
    try {
      const response = await managerService.addStadium(stadiumDetails);
      toast.success('Stadium added successfully!');
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
          marginTop: '240px',
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} />

        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: '#2e7d32', marginTop: '20px' }}
        >
          Add Stadium
        </Typography>

        <Grid container spacing={2} columns={12}>
          <Grid item size={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
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
              label="Rows"
              type="number"
              fullWidth
              name="rows"
              value={formData.rows}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={6}>
            <TextField
              label="Seats Per Row"
              type="number"
              fullWidth
              name="rowSeats"
              value={formData.rowSeats}
              onChange={handleChange}
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
          onClick={handleAddStadiumClick}
        >
          ADD
        </Button>
      </Box>
    </>
  );
};

export default AddStadiumPage;
