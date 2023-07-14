import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMotorcycles } from '../actions/motorcycleActions';
import Motorcycles from './Motorcycles';

function App() {
  const dispatch = useDispatch();
  const motorcycles = useSelector((state) => state.motorcycles);

  useEffect(() => {
    dispatch(fetchMotorcycles());
  }, [dispatch]);

  return (
    <div>
      <h1>Motorcycle App</h1>
      <Motorcycles motorcycles={motorcycles} />
    </div>
  );
}

export default App;
