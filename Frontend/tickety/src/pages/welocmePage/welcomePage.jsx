import React from 'react';
import './WelcomePage.css';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/black_on_trans.png";
import { Box, Button } from '@mui/material'; // Import MUI components

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <Box
      display="flex"           // Use flexbox for centering
      justifyContent="center"  // Center horizontally
      alignItems="center"      // Center vertically
      minHeight="90vh"         // Reduce height to leave some space from the top
      paddingTop="20px"        // Add padding from top
      textAlign="center"       // Center text inside the container
    >
      <Box
        p={4}                  // Padding around the box
        border={1}             // Border around the box
        borderRadius="8px"     // Rounded corners
        boxShadow={3}          // Add a subtle shadow
        display="flex"         // Use flexbox inside the box
        flexDirection="column" // Stack the content vertically
        alignItems="center"    // Center the content horizontally
        width="300px"          // Set a fixed width for the box
      >
        <img
          src={logo}
          className="translogo"
          alt="Logo"
          style={{ marginBottom: '20px' }} // Space below the logo
        />
        <Button
          variant="contained" 
          color="primary"
          onClick={handleSignInClick}
          fullWidth
          style={{ marginBottom: '10px' }} // Space between buttons
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignUpClick}
          fullWidth
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default WelcomePage;
