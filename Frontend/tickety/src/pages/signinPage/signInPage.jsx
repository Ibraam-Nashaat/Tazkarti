import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import logo from '../../assets/black_on_trans.png';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirection

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // To hold any error message
  const navigate = useNavigate(); // useNavigate hook for navigation
  const authService = new AuthService();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignInClick = async () => {
    // Validate if email or password is empty before proceeding
    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }

    try {
      // Send the data to AuthService if the form is valid
      const response = await authService.signIn(formData);
      navigate('/');
      // Redirect or perform other actions on success
    } catch (error) {
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
        maxWidth: '400px',
        margin: 'auto',
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
        marginTop: '100px',
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ width: '150px', marginBottom: '20px' }}
      />
      <Typography variant="h5" gutterBottom>
        Sign In
      </Typography>

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        margin="normal"
      />
       {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: '16px' }}
        onClick={handleSignInClick}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default SignInPage;
