import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/userActions';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = Object.fromEntries(new FormData(e.target));

    const { email, password } = newUser;

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    e.target.reset();
    setError('');

    dispatch(loginUser({ email, password })).then(() => {
      navigate('/motorcycles');
    });
  };

  return (
    <section id="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="text" placeholder="Email" />
        <input name="password" type="text" placeholder="Password" />

        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div>
        <span>Are you new?</span>
        <NavLink to="/register">Register</NavLink>
      </div>
    </section>
  );
}

export default Login;
