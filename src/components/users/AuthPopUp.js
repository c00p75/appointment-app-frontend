import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Register from './Register';
import ProgressBar from '../common/ProgressBar';

const AuthPopup = ({ handleClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => setIsLogin(!isLogin);

  return (
    <>
      {isLogin ? (
        <Login
          handleClose={handleClose}
          toggle={handleToggle}
          setIsLoading={setIsLoading}
        />
      ) : (
        <Register
          handleClose={handleClose}
          toggle={handleToggle}
          setIsLoading={setIsLoading}
        />
      )}
      {isLoading && <ProgressBar />}
    </>
  );
};

AuthPopup.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AuthPopup;
