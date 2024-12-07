import React, { useState } from 'react';
import './signUpPage.css';
import logo from "../../assets/black_on_trans.png"
const SignupPage = () => {
  const handleSignUpClick = (action) => {
    alert(`You clicked ${action}`);
  };
  const [gender, setGender] = useState(""); 
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const [role, setRole] = useState(""); 
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="welcome-page">
      <img
        src={logo}
        className="translogo"
      />
      <h2>Sign Up</h2>
      <div className="input-group">
            <label className="labelInput" >username</label>
            <input
              type="text"
              id="username"
              name="username"
              className='signUpInputStyle'
              required
              placeholder="Enter your username"
            />
            </div>  
      <div className="input-group">
            <label className="labelInput" >First name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className='signUpInputStyle'
              required
              placeholder="Enter your firstname"
            />
            </div>
            <div className="input-group">
            <label className="labelInput" >last name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className='signUpInputStyle'
              required
              placeholder="Enter your lastname"
            />
          </div>
          <div className="input-group">
            <label className="labelInput" >Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className='signUpInputStyle'
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label className="labelInput" >Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className='signUpInputStyle'
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="input-group">
            <label className="labelInput" >Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className='signUpInputStyle'
              required
              placeholder="Confirm your password"
            />
          </div>
          <div className="input-group">
            <label className="labelInput" >Gender</label>
            <select  
              id="gender"
              name="gender"
              required
              value={gender}
              onChange={handleGenderChange}
              
              >
              <option value="" disabled >
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="input-group">
            <label className="labelInput" >Date of Birth</label>
            <input
              className='signUpInputStyle'
              type="date"
              id="date"
              name="date"
              required
            />
          </div>
          <div className="input-group">
            <label className="labelInput" >City</label>
            <input
              type="text"
              className='signUpInputStyle'
              id="city"
              name="city"
              required
              placeholder="Enter your city"
            />
          </div>
          <div className="input-group">
            <label className="labelInput" >Address</label>
            <input
              id="address"
              name="address"
              className='signUpInputStyle'
              placeholder="Enter your address"
            ></input>
          </div>
          <div className="input-group">
            <label className="labelInput" >Role</label>
            <select  
              id="role"
              name="role"
              required
              value={role}
              onChange={handleRoleChange}
              
              >
              <option value="" disabled >
                Select your Role
              </option>
              <option value="fan">Fan</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        <div className="button-container">
             <button className='signButton' onClick={() => handleSignUpClick('SignUp')}>SignUp</button>
        </div>
    </div>
  );
};

export default SignupPage;
