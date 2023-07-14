import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Motorcycles from './Motorcycles';
import { fetchMotorcycles } from '../actions/motorcycleActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMotorcycles());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/motorcycles" element={<Motorcycles />} />
      {/* Add your routes here! */}
    </Routes>
  );
}

export default App;
