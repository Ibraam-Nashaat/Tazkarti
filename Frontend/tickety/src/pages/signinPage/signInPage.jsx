import React from 'react';
import './signInPage.css';
import logo from "../../assets/black_on_trans.png"
const SignInPage = () => {
  const handleSignInClick = (action) => {
    alert(`You clicked ${action}`);
  };


  return (
    <div className="welcome-page">
      <img
        src={logo}
        className="translogo"
      />
          <div className="input-group">
            <label className="labelInput">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className='signInInputStyle'
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label className="labelInput" >Password</label>
            <input
              className='signInInputStyle'
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
            />
          </div>
      <div className="button-container">
        <button className='signButton' onClick={() => handleSignInClick('SignIn')}>SignIn</button>
      </div>
    </div>
  );
};

export default SignInPage;
