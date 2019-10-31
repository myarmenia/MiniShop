import { combineReducers } from "redux";
import { productList } from "./products";
import { orderList } from "./orderList";

export default combineReducers({
  productList,
  orderList
});
