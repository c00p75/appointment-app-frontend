import React from 'react';
import { useSelector } from 'react-redux';

function Motorcycles() {
  const motorcycles = useSelector((state) => state.motorcycles);

  return (
    <div>
      <h1>Motorcycles</h1>
      {motorcycles.map((motorcycle) => (
        <div key={motorcycle.id}>
          <h3>{motorcycle.model}</h3>
          <p>{motorcycle.description}</p>
          {/* Render other motorcycle details as needed */}
        </div>
      ))}
    </div>
  );
}

export default Motorcycles;
