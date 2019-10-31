import { ADD_PRODUCT, UPDATE_PRODUCT_LIST } from "../types/orderList";

export const orderList = (state = [], action) => {
  if (action.type === ADD_PRODUCT) {
    state.push(action.payload);
    return [...state];
  }
  if (action.type === UPDATE_PRODUCT_LIST) {
    state = action.payload;
    return [...state];
  }

  return state;
};
