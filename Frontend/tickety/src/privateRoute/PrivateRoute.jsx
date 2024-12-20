import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userRole = localStorage.getItem("role");

  if (userRole !== "MANAGER") {
    // Redirect to unauthorized page if the user is not an admin
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the child route if the user is an admin
  return children;
};

export default PrivateRoute;
