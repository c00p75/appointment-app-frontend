import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  deleteMotorcycle,
  getMotorcycle,
} from '../../redux/actions/motorcycleActions';
import { isLoggedIn } from '../../services/users.services';
import LoginPopup from '../users/LoginPopUp';

function Motorcycle() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const motorId = location.pathname.split('/').pop();
  const { selectedMotorcycle } = useSelector((store) => store.motorcycles);

  // to ensure component do not refetch the motorcycle after delete
  const canFetchMotorcycleRef = useRef(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

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

  const handleAddReservation = () => {
    if (isLoggedIn()) {
      navigate(`/motorcycles/${motorId}/reserve`);
    } else {
      setShowLoginPopup(true);
    }
  };

  if (selectedMotorcycle) {
    return (
      <div>
        <h3>{selectedMotorcycle.model}</h3>
        <p>{selectedMotorcycle.description}</p>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
        <button type="button" onClick={handleAddReservation}>
          Add Reservation
        </button>
        {showLoginPopup && <LoginPopup handleClose={() => setShowLoginPopup(false)} />}
      </div>
    );
  }
}

export default Motorcycle;
