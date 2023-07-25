import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { loginUser } from '../../redux/actions/userActions';

function Login({ handleClose, toggle, setIsLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { navigateTo } = useSelector((store) => store.popup);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = Object.fromEntries(new FormData(e.target));

    const { email, password } = newUser;

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');

    setIsLoading(true);
    dispatch(loginUser({ email, password })).then(({ error }) => {
      setIsLoading(false);
      if (error) {
        setError('Rejected');
        return;
      }

      e.target.reset();

      if (navigateTo) {
        navigate(navigateTo);
      }
      handleClose();
    });
  };

  return (
    <section
      id="login"
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h1 className="mb-3">Login</h1>
      <form
        className="d-flex flex-column justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <input
          name="email"
          type="text"
          placeholder="Email"
          className="border border-none fs-5 w-100"
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          className="border border-none fs-5 w-100"
        />

        <button type="submit" className="my-3">
          Login
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      <div>
        <span>Are you new? </span>
        <button className="auth-toggle" type="button" onClick={() => toggle()}>
          Register
        </button>
      </div>
    </section>
  );
}

Login.propTypes = {
  toggle: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default Login;
