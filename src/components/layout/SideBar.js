import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from '../../services/users.services';
import { logoutUser } from '../../redux/actions/userActions';
import LoginPopup from '../users/LoginPopUp';

function SideBar() {
  const dispatch = useDispatch();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => { dispatch(logoutUser()); };
  const handleLoginClick = () => { setShowLoginPopup(true); };
  const handleCloseLoginPopup = () => { setShowLoginPopup(false); };

  const handleUnauthorizedClick = (link) => {
    if (!isLoggedIn()) { setShowLoginPopup(true); } else { navigate(link); }
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
      <div>
        {isLoggedIn() ? (
          <button type="button" onClick={handleLogout} className="btn btn-outline-dark login-btn">
            Logout
          </button>
        ) : (
          <button type="button" className="btn btn-outline-dark login-btn" onClick={handleLoginClick}>
            Login
          </button>
        )}
        {showLoginPopup && <LoginPopup handleClose={handleCloseLoginPopup} />}
      </div>
    </div>
  );
}

export default SideBar;
