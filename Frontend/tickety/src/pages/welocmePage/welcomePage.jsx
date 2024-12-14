import React from 'react';
import './WelcomePage.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/black_on_trans.png';
import { Box, Button } from '@mui/material'; // Import MUI components
import NavBar from '../../components/Navbar';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <>
      <NavBar />
      <Box
        display="flex" // Use flexbox for centering
        justifyContent="center" // Center horizontally
        alignItems="center" // Center vertically
        minHeight="90vh" // Reduce height to leave some space from the top
        paddingTop="20px" // Add padding from top
        textAlign="center" // Center text inside the container
      >
        <Box
          p={4} // Padding around the box
          border={1} // Set the border width to 1px for a thinner border
          borderColor="#2e7d32" // Green border color
          borderRadius="8px" // Rounded corners
          boxShadow={3} // Add a subtle shadow
          display="flex" // Use flexbox inside the box
          flexDirection="column" // Stack the content vertically
          alignItems="center" // Center the content horizontally
          width="300px" // Set a fixed width for the box
          backgroundColor="white" // Keep the background color white
        >
          <img
            src={logo}
            className="translogo"
            alt="Logo"
            style={{
              marginBottom: '20px',
              filter:
                'invert(32%) sepia(71%) saturate(1379%) hue-rotate(69deg) brightness(100%) contrast(101%)',
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignInClick}
            fullWidth
            sx={{ marginBottom: '10px', backgroundColor: '#2e7d32' }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            onClick={handleSignUpClick}
            fullWidth
            sx={{ marginTop: '5px', backgroundColor: '#2e7d32' }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default WelcomePage;
