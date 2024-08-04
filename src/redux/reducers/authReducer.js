import { IS_USER_LOGGED_IN, SET_TOKEN, SET_USER_DETAILS } from '../actionTypes';

const initialState = {
  isLoggedIn: false,
  token: '',
  userDetails:{},
};

// this reducer is used for storing user authentication status and user details
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_USER_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_USER_DETAILS:
      return { ...state, userDetails: action.payload }
    default:
      return state;
  }
};

export default authReducer;
