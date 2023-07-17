import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMotorcycles } from '../redux/actions/motorcycleActions';
import { selectMotorcycle } from '../redux/reducers/motorcyclesSlice';

function Motorcycles() {
  const { motorcycles } = useSelector((state) => state.motorcycles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMotorcycles());
  }, [dispatch]);

  const handleShowDetail = (id) => {
    dispatch(selectMotorcycle(id));
    navigate(`/motorcycles/${id}`);
  };

  return (
    <div>
      <h1>Motorcycles</h1>
      {motorcycles
        && motorcycles.map((motorcycle) => (
          <div
            role="button"
            tabIndex={0}
            key={motorcycle.id}
            onClick={() => handleShowDetail(motorcycle.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleShowDetail(motorcycle.id);
            }}
          >
            <h3>{motorcycle.model}</h3>
            <p>{motorcycle.description}</p>
            {/* Render other motorcycle details as needed */}
          </div>
        ))}
    </div>
  );
}

export default Motorcycles;
