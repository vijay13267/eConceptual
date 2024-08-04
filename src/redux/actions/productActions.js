import { SET_PRODUCTS } from '../actionTypes';

// Action to set products
export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});
