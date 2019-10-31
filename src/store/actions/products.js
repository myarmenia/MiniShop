import  {SET_PRODUCTS} from '../types/product';

export const setAllProducts = payload => ({
    type: SET_PRODUCTS,
    payload,
  })