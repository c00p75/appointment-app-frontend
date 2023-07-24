import { useLocation, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../../services/users.services';
import { logoutUser } from '../../redux/actions/userActions';
import { closePopup, setPopup } from '../../redux/reducers/popupSlice';
import { popupHelper } from '../../helpers';
import { POPUP_AUTH } from '../../constants';
import Popup from '../common/Popup';

function SideBar({ showNav, setShowNav }) {
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
  const handleCloseLoginPopup = () => {
    dispatch(closePopup());
    setLoginState(isLoggedIn());
  };

  const handleUnauthorizedClick = (link) => {
    if (!isLoggedIn()) {
      dispatch(setPopup(popupHelper(POPUP_AUTH, null, link)));
    } else {
      navigate(link);
    }
  };

  const location = useLocation();

  const closeMenu = () => {
    if (window.innerWidth <= 768) {
      setShowNav(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowNav(!showNav)}
        className="toggle-side-bar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          {showNav && (
            <g fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
              <path
                fill="#696969"
                d="m12 14.121l5.303 5.304a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.303a1.5 1.5 0 1 0 2.122 2.122L12 14.12Z"
              />
            </g>
          )}
        </svg>
      </button>
      <div className="app-navigation flex-center align-items-start flex-column">
        <span
          role="button"
          tabIndex={0}
          onClick={() => {
            navigate('/motorcycles');
            closeMenu();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate('/motorcycles');
              closeMenu();
            }
          }}
          className={location.pathname === '/motorcycles' ? 'active' : ''}
        >
          Motorcycles
        </span>

        <span
          role="button"
          tabIndex={0}
          onClick={() => {
            navigate('/reservations');
            closeMenu();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate('/reservations');
              closeMenu();
            }
          }}
          className={location.pathname === '/reservations' ? 'active' : ''}
        >
          Reservations
        </span>

        <span
          role="button"
          tabIndex={0}
          onClick={() => {
            handleUnauthorizedClick('/motorcycles/new');
            closeMenu();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUnauthorizedClick('/motorcycles/new');
              closeMenu();
            }
          }}
          className={location.pathname === '/motorcycles/new' ? 'active' : ''}
        >
          Add Motorcycle
        </span>
        <span
          role="button"
          tabIndex={0}
          onClick={() => {
            handleUnauthorizedClick('/motorcycles/delete');
            closeMenu();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUnauthorizedClick('/motorcycles/delete');
              closeMenu();
            }
          }}
          className={
            location.pathname === '/motorcycles/delete' ? 'active' : ''
          }
        >
          Delete Motorcycle
        </span>
        <span
          role="button"
          tabIndex={0}
          onClick={() => {
            handleUnauthorizedClick('/reservations/new');
            closeMenu();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUnauthorizedClick('/reservations/new');
              closeMenu();
            }
          }}
          className={location.pathname === '/reservations/new' ? 'active' : ''}
        >
          Add Reservation
        </span>
        <div className="my-3 mx-auto m-md-0">
          {loginState ? (
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-outline-dark login-btn"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-dark login-btn"
              onClick={handleLoginClick}
            >
              Login
            </button>
          )}
          {showPopup && <Popup handleClose={handleCloseLoginPopup} />}
        </div>
      </div>
    </>
  );
}

SideBar.propTypes = {
  showNav: PropTypes.bool.isRequired,
  setShowNav: PropTypes.func.isRequired,
};

export default SideBar;
