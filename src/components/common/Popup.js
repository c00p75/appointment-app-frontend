import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import AuthPopup from '../users/AuthPopUp';
import { POPUP_AUTH } from '../../constants';

function Popup({ handleClose }) {
  const { context, message } = useSelector((store) => store.popup);

  return (
    <div
      className="d-flex justify-content-center align-items-center h-100 w-100 position-fixed top-50 start-50 translate-middle"
      style={{ zIndex: 9998, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    >
      <div
        className="w-50 h-30 login-popup p-4 bg-light"
        style={{ zIndex: 9999, borderRadius: '1rem' }}
      >
        <button
          type="button"
          className="close-btn position-absolute top-0 end-0 mt-3 me-3"
          onClick={handleClose}
        >
          Close
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
}

Popup.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default Popup;
