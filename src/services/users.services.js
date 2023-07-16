import Cookies from 'js-cookie';

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

export { isLoggedIn, getUser };
