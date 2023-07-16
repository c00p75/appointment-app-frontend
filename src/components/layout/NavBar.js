import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from '../../services/users.services';
import { logoutUser } from '../../redux/actions/userActions';

function NavBar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="navbar">
      {isLoggedIn() ? (
        <div className="nav-links">
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </div>
  );
}

export default NavBar;
