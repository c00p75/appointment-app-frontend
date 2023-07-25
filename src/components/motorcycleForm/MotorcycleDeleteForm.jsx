import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteMotorcycle,
  getUserMotorcycles,
} from '../../redux/actions/motorcycleActions';
import { BASE_URL } from '../../constants';
import './motorcycleForm.css';

const MotorcycleDeleteForm = () => {
  const dispatch = useDispatch();
  const { loading, userMotorcycles } = useSelector(
    (state) => state.motorcycles,
  );
  const [motorcycles, setMotorcycles] = useState([]);

  useEffect(() => {
    dispatch(getUserMotorcycles());
  }, [dispatch]);

  useEffect(() => {
    setMotorcycles(userMotorcycles);
  }, [userMotorcycles]);

  const handleDelete = async (motorcycle) => {
    await dispatch(deleteMotorcycle(motorcycle));
    setMotorcycles(motorcycles.filter((i) => i.id !== motorcycle));
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center pt-5 mt-4 mt-md-5"
      id="delete-motorcycle"
    >
      {loading && <div className="loader" />}
      <h2 className="text-center">Delete Motorcycles</h2>
      <div className="my-3 divide" />
      {!motorcycles.length && (
        <div className="text-center mt-5">No motorcycles added</div>
      )}
      {motorcycles.map((motorcycle, index) => (
        <div
          key={`motorcycle-${index + 1}`}
          className="container d-flex justify-content-around m-2 mx-md-5"
          style={{ width: 'auto' }}
        >
          <div className="row d-flex align-items-center justify-content-center p-3">
            <img
              src={BASE_URL + motorcycle.photo.url}
              alt="pic"
              className="col-12 col-md-4"
            />
            <div className="col-6 col-md-4 fw-bold text-center">
              {motorcycle.model}
            </div>
            <button
              className="col-6 col-md-4 my-4 my-md-0 btn btn-danger flex-center"
              disabled={loading}
              type="submit"
              onClick={() => handleDelete(motorcycle.id)}
              style={{ width: 'fit-content' }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MotorcycleDeleteForm;
