import React from 'react';
import './WelcomePage.css';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/black_on_trans.png"
const WelcomePage = () => {
  const navigate=useNavigate()
  const handleSignInClick = () => {
    navigate('/signin');
  };
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="welcome-page">
      <img
        src={logo}
        className="translogo"
      />
      <div className="button-container">
        <button className='signButton' onClick={() => handleSignInClick()}>SignIn</button>
        <button className='signButton' onClick={() => handleSignUpClick()}>SignUp</button>
      </div>
    </div>
  );
};

export default WelcomePage;
