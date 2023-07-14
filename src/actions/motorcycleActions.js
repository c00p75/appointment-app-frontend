import axios from 'axios';

export const FETCH_MOTORCYCLES_SUCCESS = 'FETCH_MOTORCYCLES_SUCCESS';

export const fetchMotorcyclesSuccess = (motorcycles) => ({
  type: FETCH_MOTORCYCLES_SUCCESS,
  payload: motorcycles,
});

export const fetchMotorcycles = () => (dispatch) => {
  axios
    .get('http://127.0.0.1:3000/motorcycles/')
    .then((response) => {
      dispatch(fetchMotorcyclesSuccess(response.data));
    })
    .catch((error) => {
      console.error('Error fetching motorcycles:', error);
    });
};
