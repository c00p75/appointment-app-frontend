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
    <section id="login" className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-3">Login</h1>
      <form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
        <input name="email" type="text" placeholder="Email" className="border border-none fs-5" />
        <input name="password" type="text" placeholder="Password" className="border border-none fs-5" />

        <button type="submit" className="my-3">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div>
        <span>Are you new? </span>
        <NavLink to="/register">Register</NavLink>
      </div>
    </section>
  );
}

export default Login;
