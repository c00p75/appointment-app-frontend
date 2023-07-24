import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../redux/actions/userActions';

function Register({ toggle, setIsLoading }) {
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = Object.fromEntries(new FormData(e.target));

    const {
      name, email, username, password, confirmPassword,
    } = newUser;

    if (!name || !email || !username || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError("Password didn't match!");
      return;
    }

    e.target.reset();
    setError('');

    const userData = {
      name,
      email,
      username,
      password,
    };

    setIsLoading(true);
    dispatch(registerUser(userData)).then(({ error }) => {
      setIsLoading(false);
      if (error) {
        setError('Rejected');
        return;
      }
      toggle();
    });
  };

  return (
    <section
      id="register"
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h1 className="mb-3">REGISTER</h1>
      <form
        className="d-flex flex-column justify-content-center align-items-center"
        onSubmit={handleRegister}
      >
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="border border-none fs-5"
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="border border-none fs-5"
        />
        <input
          name="email"
          type="text"
          placeholder="Email"
          className="border border-none fs-5"
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          className="border border-none fs-5"
        />
        <input
          name="confirmPassword"
          type="text"
          placeholder="Confirm password"
          className="border border-none fs-5"
        />

        <button type="submit" className="my-3">
          Register
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      <div>
        <span>Already registered?</span>
        <button className="auth-toggle" type="button" onClick={() => toggle()}>
          Login
        </button>
      </div>
    </section>
  );
}

Register.propTypes = {
  toggle: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default Register;
