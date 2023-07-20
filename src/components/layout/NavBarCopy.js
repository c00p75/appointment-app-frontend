import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../../services/users.services';
import { logoutUser } from '../../redux/actions/userActions';
import { closePopup, setPopup } from '../../redux/reducers/popupSlice';
import { popupHelper } from '../../helpers';
import { POPUP_AUTH } from '../../constants';
import Popup from '../common/Popup';

function NavBar() {
  const dispatch = useDispatch();
  const [loginState, setLoginState] = useState(isLoggedIn());
  const navigate = useNavigate();

  const { showPopup } = useSelector((store) => store.popup);

  const handleLogout = () => {
    dispatch(logoutUser());
    setLoginState(isLoggedIn());
  };

  const handleLoginClick = () => {
    dispatch(setPopup(popupHelper(POPUP_AUTH)));
  };

  const handleClosePopup = () => {
    dispatch(closePopup());
    setLoginState(isLoggedIn());
  };

  const handleUnauthorizedClick = (link) => {
    if (!isLoggedIn()) {
      dispatch(setPopup(popupHelper(POPUP_AUTH)));
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
          {loginState ? (
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
          {showPopup && <Popup handleClose={handleClosePopup} />}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
