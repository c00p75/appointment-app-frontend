// import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from '../../services/users.services';
import { logoutUser } from '../../redux/actions/userActions';
import LoginPopup from '../users/LoginPopUp';

function NavBar() {
  const dispatch = useDispatch();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="navbar">
      {isLoggedIn() ? (
        <div className="nav-links">
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="nav-bar d-flex justify-content-between position-absolute p-3">
          <div>
            <i className="fa fa-align-justify" />
          </div>
          <div>
            <i className="fa fa-search" />
            {/* <NavLink to="/login" className="btn ms-1">Login</NavLink> */}
            <button type="button" className="login-btn" onClick={handleLoginClick}>
              Login
            </button>
            {showLoginPopup && <LoginPopup handleClose={handleCloseLoginPopup} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
