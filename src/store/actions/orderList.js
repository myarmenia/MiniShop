import { ADD_PRODUCT, UPDATE_PRODUCT_LIST } from "../types/orderList";

export const addProduct = payload => ({
  type: ADD_PRODUCT,
  payload
});

export const updateProduct = payload => ({
  type: UPDATE_PRODUCT_LIST,
  payload
});
