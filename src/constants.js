export const { PORT } = process.env;
// export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:3050/';
export const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://cycle-cruise-backend.onrender.com/';
export const USER_BASE_URL = `${BASE_URL}users/tokens/`;

export const POPUP_AUTH = 'auth';
export const POPUP_ALERT = 'alert';
