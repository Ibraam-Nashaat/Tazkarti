import React from "react";
import "./WelcomePage.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/black_on_trans.png";
import { Box, Button } from "@mui/material"; // Import MUI components
import NavBar from "../../components/Navbar";

const WelcomePage = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by checking the presence of the accessToken
  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = Boolean(accessToken);

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleMatchesClick = () => {
    navigate("/viewmatch");
  };

  return (
    <>
      <NavBar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
        paddingTop="20px"
        textAlign="center"
      >
        <Box
          p={4}
          border={1}
          borderColor="#2e7d32"
          borderRadius="8px"
          boxShadow={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="300px"
          backgroundColor="white"
        >
          <img
            src={logo}
            className="translogo"
            alt="Logo"
            style={{
              marginBottom: "20px",
              filter:
                "invert(32%) sepia(71%) saturate(1379%) hue-rotate(69deg) brightness(100%) contrast(101%)",
            }}
          />
          {isLoggedIn ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleMatchesClick}
              fullWidth
              sx={{ marginBottom: "10px", backgroundColor: "#2e7d32" }}
            >
              Go to Matches
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignInClick}
                fullWidth
                sx={{ marginBottom: "10px", backgroundColor: "#2e7d32" }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={handleSignUpClick}
                fullWidth
                sx={{ marginTop: "5px", backgroundColor: "#2e7d32" }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default WelcomePage;
