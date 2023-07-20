import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Register from './Register';

function AuthPopup({ handleClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => setIsLogin(!isLogin);

  if (isLogin) return <Login handleClose={handleClose} toggle={handleToggle} />;
  return <Register handleClose={handleClose} toggle={handleToggle} />;
}

AuthPopup.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AuthPopup;
