/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMotorcycles, deleteMotorcycle } from '../../redux/actions/motorcycleActions';

function MotorcycleDeleteForm() {
  const dispatch = useDispatch();
  const [allMotorcycle, setAllMotorcycle] = useState([]);
  const { motorcycles } = useSelector((state) => state.motorcycles);

  useEffect(() => {
    dispatch(getMotorcycles());
    setAllMotorcycle(motorcycles);
  }, [dispatch, motorcycles]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (motorcycle) => {
    setIsLoading(true);
    await dispatch(deleteMotorcycle(motorcycle));
    setIsLoading(false);
  };

  return (
    <div className="container d-flex flex-column justify-content-center pt-5">
      {allMotorcycle.map((motorcycle, index) => (
        <div key={`motorcycle-${index + 1}`} className="container d-flex justify-content-around m-2 mx-md-5" style={{ width: 'auto' }}>
          <span className="fw-bold">{motorcycle.model}</span>
          <button className="btn btn-danger flex-center" disabled={isLoading} type="submit" onClick={() => handleDelete(motorcycle.id)} style={{ width: 'fit-content' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default MotorcycleDeleteForm;
