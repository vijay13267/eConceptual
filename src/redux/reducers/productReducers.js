import { SET_PRODUCTS } from '../actionTypes';

const initialState = {
  products: [],
};

// this reducer is used for storing products
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export default productReducer;
