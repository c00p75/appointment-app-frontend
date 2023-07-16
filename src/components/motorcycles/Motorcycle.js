import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  deleteMotorcycle,
  getMotorcycle,
} from '../../redux/actions/motorcycleActions';

function Motorcycle() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const motorId = location.pathname.split('/').pop();
  const { selectedMotorcycle } = useSelector((store) => store.motorcycles);

  // to ensure component do not refetch the motorcycle after delete
  const canFetchMotorcycleRef = useRef(true);

  useEffect(() => {
    if (canFetchMotorcycleRef && !selectedMotorcycle) {
      dispatch(getMotorcycle(motorId));
      canFetchMotorcycleRef.current = false;
    } else canFetchMotorcycleRef.current = false;
  }, [dispatch, selectedMotorcycle, motorId]);

  const handleDelete = () => {
    dispatch(deleteMotorcycle(motorId)).then(() => {
      navigate('/motorcycles');
    });
  };

  if (selectedMotorcycle) {
    return (
      <div>
        <h3>{selectedMotorcycle.model}</h3>
        <p>{selectedMotorcycle.description}</p>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    );
  }
}

export default Motorcycle;
