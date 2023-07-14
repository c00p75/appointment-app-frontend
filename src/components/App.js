import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Motorcycles from './Motorcycles';
import Register from './users/Register';
import Login from './users/Login';

function App() {
  return (
    <Routes>
      <Route path="/motorcycles" element={<Motorcycles />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* Add your routes here! */}
    </Routes>
  );
}

export default App;
