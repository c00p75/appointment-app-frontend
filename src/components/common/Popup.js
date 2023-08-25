import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import AuthPopup from '../users/AuthPopUp';
import { POPUP_AUTH } from '../../constants';

const Popup = ({ handleClose }) => {
  const { context, message } = useSelector((store) => store.popup);

  return (
    <div
      className="d-flex justify-content-center align-items-center h-100 w-100 position-fixed top-50 start-50 translate-middle"
      id="login-popup-overlay"
    >
      <div
        className="login-popup bg-light position-relative"
        style={{ zIndex: 9999 }}
      >
        {' '}
        <i className="fa fa-xmark" />
        <button
          type="button"
          className="close-btn position-absolute top-0 end-0 mt-3 me-3"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
        {context === POPUP_AUTH ? (
          <AuthPopup handleClose={handleClose} />
        ) : (
          <div>
            <p>{message}</p>
            <button type="button" onClick={handleClose}>
              Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Popup.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default Popup;
