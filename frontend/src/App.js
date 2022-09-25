/* Imports */
import React from 'react';
import Register from './Components/Register/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './Components/Navbar/Navbar';
import PsychometricTest from './Components/PsychometricTest/PsychometricTest';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import QnA from './Components/QnA/QnA';
import Footer from './Components/Footer/Footer';
import Answer from './Components/Answer/Answer';
import Account from './Components/Account/Account';
import Dashboard from './Components/Dashboard/Dashboard';
import { useSelector } from 'react-redux';
import CareenPath from './Components/CareerPath/CareerPath';
import ZoomMeeting from './Components/ZoomMeeting/ZoomMeeting';
import About from './Components/About/About';
import VerifyAccount from './Components/VerifyAccount/VerifyAccount';

/* Private Routing if user is not logged in then they can't access specific routes. */
const PrivateRoutes = ({ user, children }) => {
  if (!user) {
    return <Navigate to='/' replace />
  }
  return children;
}

function App() {
  /* Gets data from redux */
  const user = useSelector((state) => state.userData).email;
  
  return (
    /* Router */
    <BrowserRouter>
      {/* NavbarComponent shown to every route/page. */}
      <NavbarComponent />
      <Routes>
        {/* Registration Route */}
        <Route path='/register' element={<Register />} />
        {/* Login Route */}
        <Route path='/login' element={<Login />} />
        {/* Psychometric Test Route */}
        <Route path='/psychometric-test' element={<PrivateRoutes user={user}><PsychometricTest /></PrivateRoutes>} />
        {/* Home Route */}
        <Route path='/' element={<Home />} />
        {/* Question and Answer Route */}
        <Route path='/qna' element={<QnA />} />
        {/* Answers Page Route */}
        <Route path='/answer/:questionId' element={<Answer />} />
        {/* Account Route */}
        <Route path='/account' element={<PrivateRoutes user={user}><Account /></PrivateRoutes>} />
        {/* Dashboard Route */}
        <Route path='/dashboard' element={<PrivateRoutes user={user}><Dashboard /></PrivateRoutes>} />
        <Route
            path="/dashboard/:id"
            element={<PrivateRoutes user={user} ><CareenPath /></PrivateRoutes>}
            
          />
           <Route path='/ZoomMeeting' element={<PrivateRoutes user={user}><ZoomMeeting /></PrivateRoutes>} />
        {/* About Route */}
        <Route path='/about' element={<About />} />
        {/* ${process.env.frontendUrl}${value._id}/email=${value.emailID} */}
        <Route path='/verifyaccount/:id/email=:email' element={<VerifyAccount />} />
      </Routes>
     
      {/* Renders Footer Component */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
