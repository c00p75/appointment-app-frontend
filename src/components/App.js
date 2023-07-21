import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Motorcycles from './Motorcycles';
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
        <Route index element={<Motorcycles />} />
        <Route path="/motorcycles" element={<Motorcycles />} />
        <Route path="/motorcycles/new" element={<MotorcycleForm />} />
        <Route path="/motorcycles/delete" element={<MotorcycleDeleteForm />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/new" element={<ReserveForm />} />
        <Route path="/motorcycles/:id" element={<Motorcycle />} />
        {/* Add your routes here! */}
        <Route path="*" element={<Navigate to="/motorcycles" />} />
      </Route>
    </Routes>
  );
}

export default App;
