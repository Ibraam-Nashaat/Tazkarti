import { useState } from "react";
import "./App.css";
import WelcomePage from "./pages/welocmePage/welcomePage";
import SignInPage from "./pages/signinPage/signInPage";
import SignupPage from "./pages/signupPage/signUpPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditData from "./pages/editDataPage/editData";
import AddMatch from "./pages/addMatchPage/addMatchPage";
// import EditMatch from './pages/editMatchPage/editMatch';
import ViewMatchPage from "./pages/viewMatchesPage/ViewMatchPage";
import UserListPage from "./pages/ViewUsersPage";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Unauthorized from "./unAuthorized/Unauthorized";
import EditFanProfilePage from "./pages/EditFanProfilePage";
import AddStadiumPage from "./pages/AddStadiumPage";
import EditMatch from "./pages/editMatchPage/editMatch";
import ViewTickets from "./pages/ViewTickets";
import SeatReservation from "./pages/seatReservationPage/SeatReservation";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/viewmatch" element={<ViewMatchPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/profile" element={<EditFanProfilePage />} />
          <Route path="/addStadium" element={<AddStadiumPage />} />
          <Route path="/tickets" element={<ViewTickets />} />
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/editdata" element={<EditData />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/reserveMatch" element={<SeatReservation />} />
          <Route
            path="/AddMatch"
            element={
              <PrivateRoute>
                <AddMatch />
              </PrivateRoute>
            }
          />
          <Route
            path="/editmatch"
            element={
              <PrivateRoute>
                <EditMatch />
              </PrivateRoute>
            }
          />
          {/* Following line should be commented at the end of the project */}
          {/* <Route path="/editmatch" element={<EditMatch />} /> */}
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
