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
        <div className="nav-bar d-flex justify-content-between position-absolute p-3">
          <div>
            <i className="fa fa-align-justify" />
          </div>
          <div>
            <i className="fa fa-search" />
            <NavLink to="/login" className="btn ms-1">Login</NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
