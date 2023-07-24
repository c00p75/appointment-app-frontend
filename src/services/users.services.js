import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const isLoggedIn = () => {
  if (Cookies.get('accessToken')) return true;

  return false;
};

const getUser = () => {
  if (isLoggedIn) {
    return 'User';
  }
  return null;
};

const isUser = () => {
  const users = useSelector((store = store.users));
  return users.isLoggedIn;
};

export { isLoggedIn, getUser, isUser };
