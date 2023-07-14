import { FETCH_MOTORCYCLES_SUCCESS } from '../actions/motorcycleActions';

const initialState = {
  motorcycles: [],
};

// eslint-disable-next-line default-param-last
const motorcycleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOTORCYCLES_SUCCESS:
      return {
        ...state,
        motorcycles: action.payload,
      };
    default:
      return state;
  }
};

export default motorcycleReducer;
