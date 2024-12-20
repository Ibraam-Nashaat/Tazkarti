import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirection
import NavBar from '../../components/Navbar';

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
      if (response.role === 'ADMIN') {
        navigate('/users');
      } else if (response.role === 'MANAGER') {
        navigate('/addmatch');
      } else navigate('/');
      // Redirect or perform other actions on success
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Redirect to the signup page
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
          maxWidth: '400px',
          margin: 'auto',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
          marginTop: '250px',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: '#2e7d32', marginTop: '20px' }}
        >
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
          fullWidth
          sx={{ marginTop: '16px', backgroundColor: '#2e7d32' }}
          onClick={handleSignInClick}
        >
          Sign In
        </Button>

        {/* Non-clickable "Don't have an account?" text */}
        <Typography variant="body2" sx={{ marginTop: '8px' }}>
          Don't have an account? {/* Only the Sign Up text is clickable */}
          <Typography
            variant="body2"
            component="span"
            sx={{
              color: '#2e7d32',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={handleSignUpClick}
          >
            Sign Up
          </Typography>
        </Typography>
      </Box>
    </>
  );
};

export default SignInPage;
