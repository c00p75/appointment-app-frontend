import { BASE_URL } from '../../constants';
import axiosInstance from '../../config/axiosInstance';

export const FETCH_MOTORCYCLES_SUCCESS = 'FETCH_MOTORCYCLES_SUCCESS';

// const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3050/';

export const fetchMotorcyclesSuccess = (motorcycles) => ({
  type: FETCH_MOTORCYCLES_SUCCESS,
  payload: motorcycles,
});

export const fetchMotorcycles = () => (dispatch) => {
  axiosInstance
    .get(`${BASE_URL}motorcycles/`)
    .then((response) => {
      dispatch(fetchMotorcyclesSuccess(response.data));
    })
    .catch((error) => {
      console.error('Error fetching motorcycles:', error);
    });
};
