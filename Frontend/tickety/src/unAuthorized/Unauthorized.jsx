import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
        p: 3,
        maxWidth: 500,
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" color="error" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        You do not have permission to view this page. Please contact your administrator if you believe this is a mistake.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ mt: 2 }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default Unauthorized;
