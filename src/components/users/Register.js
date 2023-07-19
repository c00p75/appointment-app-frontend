import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { registerUser } from '../../redux/actions/userActions';

function Register({ toggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    dispatch(registerUser(userData)).then(() => {
      navigate('/login');
    });
  };

  return (
    <section id="register">
      <h1>REGISTER</h1>
      <form onSubmit={handleRegister}>
        <input name="name" type="text" placeholder="Name" />
        <input name="username" type="text" placeholder="Username" />
        <input name="email" type="text" placeholder="Email" />
        <input name="password" type="text" placeholder="Password" />
        <input
          name="confirmPassword"
          type="text"
          placeholder="Confirm password"
        />

        <button type="submit">Register</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div>
        <span>Already registered?</span>
        <button type="button" onClick={() => toggle()}>
          Login
        </button>
      </div>
    </section>
  );
}

Register.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Register;
