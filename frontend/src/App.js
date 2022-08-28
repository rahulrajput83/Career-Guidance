/* Imports */
import React from 'react';
import Register from './Components/Register/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavbarComponent from './Components/Navbar/Navbar';
import PsychometricTest from './Components/PsychometricTest/PsychometricTest';
import Login from './Components/Login/Login';


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
    </Routes>
    </BrowserRouter>
  );
}

export default App;
