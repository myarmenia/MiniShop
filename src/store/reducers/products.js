import { SET_PRODUCTS } from "../types/product";

export const productList = (state = [], action) => {
  if (action.type === SET_PRODUCTS) {
    state = action.payload;
    return state;
  }
  return state;
};
