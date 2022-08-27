import React from 'react';
import Register from './Components/Register.js/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavbarComponent from './Components/Navbar/Navbar';


function App() {
  return (
    <BrowserRouter>
    <NavbarComponent />
    <Routes>
      <Route path='/register' element={<Register />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
