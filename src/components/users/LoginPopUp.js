import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';

function LoginPopup({ handleClose }) {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100 position-fixed top-50 start-50 translate-middle" style={{ zIndex: 9998, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="w-50 h-30 login-popup p-4 bg-light" style={{ zIndex: 9999, borderRadius: '1rem' }}>
        <button type="button" className="close-btn position-absolute top-0 end-0 mt-3 me-3" onClick={handleClose}>
          Close
        </button>
        <Login />
      </div>
    </div>
  );
}

LoginPopup.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default LoginPopup;
