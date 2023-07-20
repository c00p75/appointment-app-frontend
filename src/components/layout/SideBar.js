import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../../services/users.services';
import { logoutUser } from '../../redux/actions/userActions';
import { closePopup, setPopup } from '../../redux/reducers/popupSlice';
import { popupHelper } from '../../helpers';
import { POPUP_AUTH } from '../../constants';
import Popup from '../common/Popup';

function SideBar() {
  const dispatch = useDispatch();
  const [loginState, setLoginState] = useState(isLoggedIn());
  const navigate = useNavigate();
  const { showPopup } = useSelector((store) => store.popup);
  const handleLogout = () => { dispatch(logoutUser()); setLoginState(isLoggedIn()); };
  const handleLoginClick = () => { dispatch(setPopup(popupHelper(POPUP_AUTH))); };
  const handleCloseLoginPopup = () => { dispatch(closePopup()); setLoginState(isLoggedIn()); };

  const handleUnauthorizedClick = (link) => {
    if (!isLoggedIn()) { dispatch(setPopup(popupHelper(POPUP_AUTH))); } else { navigate(link); }
  };

  const location = useLocation();

  return (
    <div className="app-navigation flex-center align-items-start flex-column">
      <span
        role="button"
        tabIndex={0}
        onClick={() => { navigate('/motorcycles'); }}
        onKeyDown={(e) => { if (e.key === 'Enter') { navigate('/motorcycles'); } }}
        className={location.pathname === '/motorcycles' ? 'active' : ''}
      >
        Motorcycles
      </span>

      <span
        role="button"
        tabIndex={0}
        onClick={() => { navigate('/reservations'); }}
        onKeyDown={(e) => { if (e.key === 'Enter') { navigate('/reservations'); } }}
        className={location.pathname === '/reservations' ? 'active' : ''}
      >
        Reservations
      </span>

      <span
        role="button"
        tabIndex={0}
        onClick={() => { handleUnauthorizedClick('/motorcycles/new'); }}
        onKeyDown={(e) => { if (e.key === 'Enter') { handleUnauthorizedClick('/motorcycles/new'); } }}
        className={location.pathname === '/motorcycles/new' ? 'active' : ''}
      >
        Add Motorcycle
      </span>
      <span
        role="button"
        tabIndex={0}
        onClick={() => { handleUnauthorizedClick('/motorcycles/delete'); }}
        onKeyDown={(e) => { if (e.key === 'Enter') { handleUnauthorizedClick('/motorcycles/delete'); } }}
        className={location.pathname === '/motorcycles/delete' ? 'active' : ''}
      >
        Delete Motorcycle
      </span>
      <span
        role="button"
        tabIndex={0}
        onClick={() => { handleUnauthorizedClick('/reservations/new'); }}
        onKeyDown={(e) => { if (e.key === 'Enter') { handleUnauthorizedClick('/reservations/new'); } }}
        className={location.pathname === '/reservations/new' ? 'active' : ''}
      >
        Add Reservation
      </span>
      <div className="my-3 mx-auto m-md-0">
        {loginState ? (
          <button type="button" onClick={handleLogout} className="btn btn-outline-dark login-btn">
            Logout
          </button>
        ) : (
          <button type="button" className="btn btn-outline-dark login-btn" onClick={handleLoginClick}>
            Login
          </button>
        )}
        {showPopup && <Popup handleClose={handleCloseLoginPopup} />}
      </div>
    </div>
  );
}

export default SideBar;
