import { useState } from 'react'
import './App.css'
import WelcomePage from './pages/welocmePage/welcomePage'
import SignInPage from './pages/signinPage/signInPage'
import SignupPage from './pages/signupPage/signUpPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditData from './pages/editDataPage/editData'
import AddMatch from './pages/addMatchPage/addMatchPage'
function App() {


  return (
    <>
            <Router>
                <Routes>
                    <Route  element={<WelcomePage />} />
                    <Route  path="/signin" element= {<SignInPage/>} /> 
                    <Route path="/signup" element={<SignupPage/>} />
                    <Route   path ="/editdata"  element={<EditData />} />
                    <Route index    /* path="/addmatch" */ element={<AddMatch />} />

                </Routes>
            </Router>
    </>
  )
}

export default App
