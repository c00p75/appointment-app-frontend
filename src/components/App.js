import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Motorcycles from './Motorcycles';
import Register from './users/Register';
import Login from './users/Login';
import Layout from './layout/Layout';
import Motorcycle from './motorcycles/Motorcycle';
import MotorcycleForm from './motorcycleForm/MotorcycleForm';
import Reservations from './Reservations';
import ReserveForm from './reservationForm/ReservationForm';
import MotorcycleDeleteForm from './motorcycleForm/MotorcycleDeleteForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/motorcycles" element={<Motorcycles />} />
        <Route path="/motorcycles/new" element={<MotorcycleForm />} />
        <Route path="/motorcycles/delete" element={<MotorcycleDeleteForm />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/new" element={<ReserveForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/motorcycles/:id" element={<Motorcycle />} />
        {/* Add your routes here! */}
      </Route>
    </Routes>
  );
}

export default App;
