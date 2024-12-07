import { useState } from 'react'
import './App.css'
import WelcomePage from './pages/welocmePage/welcomePage'
import SignInPage from './pages/signinPage/signInPage'
import SignupPage from './pages/signupPage/signUpPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditData from './pages/editDataPage/editData'
function App() {


  return (
    <>
            <Router>
                <Routes>
                    <Route  element={<WelcomePage />} />
                    <Route  path="/signin" element= {<SignInPage/>} /> 
                    <Route path="/signup" element={<SignupPage/>} />
                    <Route index /* path ="/editdata" */ element={<EditData />}    />
                </Routes>
            </Router>
    </>
  )
}

export default App
