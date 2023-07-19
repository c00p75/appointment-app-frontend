import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from '../../services/users.services';
import { logoutUser } from '../../redux/actions/userActions';
import LoginPopup from '../users/LoginPopUp';

function NavBar() {
  const dispatch = useDispatch();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const handleUnauthorizedClick = (link) => {
    if (!isLoggedIn()) {
      setShowLoginPopup(true);
    } else {
      navigate(link);
    }
  };

  return (
    <div className="navbar boder border-dark">
      <div className="nav-bar d-flex justify-content-between position-absolute p-3">
        <div>
          <i className="fa fa-align-justify" />
        </div>
        <div className="d-flex g-5">
          <span
            role="button"
            tabIndex={0}
            onClick={() => handleUnauthorizedClick('/motorcycles/new')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUnauthorizedClick('/motorcycles/new');
              }
            }}
          >
            Add Motorcycle
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={() => handleUnauthorizedClick('/delete-motorcycle')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUnauthorizedClick('/delete-motorcycle');
              }
            }}
          >
            Delete Motorcycle
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={() => handleUnauthorizedClick('/reserve')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUnauthorizedClick('/reserve');
              }
            }}
          >
            Add Reservation
          </span>
          <i className="fa fa-search" />
          {/* <NavLink to="/login" className="btn ms-1">Login</NavLink> */}
          {isLoggedIn() ? (
            <button className="nav-links" type="button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button
              type="button"
              className="login-btn"
              onClick={handleLoginClick}
            >
              Login
            </button>
          )}
          {showLoginPopup && <LoginPopup handleClose={handleCloseLoginPopup} />}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
