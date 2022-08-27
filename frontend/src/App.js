/* Imports */
import React from 'react';
import Register from './Components/Register.js/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavbarComponent from './Components/Navbar/Navbar';
import CareerTest from './Components/CareerTest/CareerTest';


function App() {
  return (
    /* Router */
    <BrowserRouter>
    {/* NavbarComponent shown to every route/page. */}
    <NavbarComponent />
    <Routes>
      {/* Registration Route */}
      <Route path='/register' element={<Register />} />
      {/*  */}
      <Route path='/career-test' element={<CareerTest />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
