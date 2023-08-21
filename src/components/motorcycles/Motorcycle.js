import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  deleteMotorcycle,
  getMotorcycle,
} from '../../redux/actions/motorcycleActions';
import { isLoggedIn } from '../../services/users.services';
import { POPUP_ALERT, POPUP_AUTH } from '../../constants';
import MotorcycleDetail from './MotorcycleDetail';
import { setPopup } from '../../redux/reducers/popupSlice';
import { popupHelper } from '../../helpers';

const Motorcycle = () => {
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
    const deleteError = 'You are not allowed to delete this item!';
    dispatch(deleteMotorcycle(motorId)).then(({ error }) => {
      if (error) {
        if (error.message === 'Rejected') {
          dispatch(setPopup(popupHelper(POPUP_ALERT, deleteError)));
        } else dispatch(setPopup(popupHelper(POPUP_ALERT, 'Some error occured!')));
        return;
      }
      navigate('/motorcycles');
    });
  };

  const handleAddReservation = () => {
    if (isLoggedIn()) {
      navigate('/reservations/new');
    } else {
      dispatch(setPopup(popupHelper(POPUP_AUTH, null, '/reservations/new')));
    }
  };

  if (selectedMotorcycle) {
    return (
      <div id="motorcycle-show">
        <div className="left-detail">
          <div className="d-flex align-items-center h-100 justify-content-center">
            <img
              src={selectedMotorcycle.photo.url}
              alt={selectedMotorcycle.model}
            />
          </div>

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
      </div>
    );
  }
  return (
    <div className="m-5 p-5 w-100 d-flex align-items-center justify-content-center">
      MotoCycle not found
    </div>
  );
};

export default Motorcycle;
