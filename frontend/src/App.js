/* Imports */
import React from 'react';
import Register from './Components/Register/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavbarComponent from './Components/Navbar/Navbar';
import PsychometricTest from './Components/PsychometricTest/PsychometricTest';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import QnA from './Components/QnA/QnA';
import Footer from './Components/Footer/Footer';
import Answer from './Components/Answer/Answer';
import Account from './Components/Account/Account';
import Dashboard from './Components/Dashboard/Dashboard';


function App() {

  return (
    /* Router */
    <BrowserRouter>
    {/* NavbarComponent shown to every route/page. */}
    <NavbarComponent />
    <Routes>
      {/* Registration Route */}
      <Route path='/register' element={<Register />} />
      {/* Psychometric Test Route */}
      <Route path='/psychometric-test' element={<PsychometricTest />} />
      {/* Login Route */}
      <Route path='/login' element={<Login />} />
      {/* Home Route */}
      <Route path='/' element={<Home />} />
      {/* Question and Answer Route */}
      <Route path='/qna' element={<QnA />} />
      {/* Answers Page Route */}
      <Route path='/answer/:questionId' element={<Answer />} />
      {/* Account Route */}
      <Route path='/account' element={<Account />} />
       {/* Dashboard Route */}
       <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    {/* Renders Footer Component */}
    <Footer />
    </BrowserRouter>
  );
}

export default App;
