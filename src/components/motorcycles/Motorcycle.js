import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  deleteMotorcycle,
  getMotorcycle,
} from '../../redux/actions/motorcycleActions';
import { isLoggedIn } from '../../services/users.services';
import LoginPopup from '../users/LoginPopUp';
import { BASE_URL } from '../../constants';
import MotorcycleDetail from './MotorcycleDetail';

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
      navigate('/reserve');
    } else {
      setShowLoginPopup(true);
    }
  };

  if (selectedMotorcycle) {
    return (
      <div id="motorcycle-show" className="row">
        <div className="col-8">
          <img
            src={`${BASE_URL}${selectedMotorcycle.photo.url}`}
            alt={selectedMotorcycle.model}
            className="moto-photo"
          />
          <button
            type="button"
            className="btn-action btn-nav-left"
            onClick={() => navigate('/motorcycles')}
          >
            <i className="fa fa-caret-left" />
          </button>
        </div>
        <MotorcycleDetail
          handleDelete={handleDelete}
          handleAddReservation={handleAddReservation}
          selectedMotorcycle={selectedMotorcycle}
        />
        {showLoginPopup && (
          <LoginPopup handleClose={() => setShowLoginPopup(false)} />
        )}
      </div>
    );
  }
}

export default Motorcycle;
