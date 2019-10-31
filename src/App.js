import React, { useEffect, useState } from "react";
import "./styles/main.css";
import { products } from "./mock";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import Header from "./components/header/header";

import {setAllProducts} from './store/actions/products';
import {addProduct,updateProduct} from './store/actions/orderList';


function App(props) {
  const [card, setCard] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentId, setCurrentId] = useState();
  const reducerQty = (accumulator, currentValue) =>
    accumulator + currentValue.quantity;
  const reducerPrice = (accumulator, currentValue) =>
    accumulator + currentValue.price * currentValue.quantity;

  const {
    productList,
    userOrder,
    updateList,
    addToOrderList,
    setProducts
  } = props;
  useEffect(() => {
    setProducts(products);
    if (userOrder.length) setTotal(userOrder.reduce(reducerQty, 0));
    if (showCard) setTotalPrice(userOrder.reduce(reducerPrice, 0));
  }, [card, userOrder, setProducts,  showCard, qty]);

  const add = e => {
    const currentId = e.currentTarget.id;
    let arr = [];
    let isIn = false;
    if (userOrder.length) {
      arr = userOrder;
      for (let el of arr) {
        if (el.id === +currentId) {
          el.quantity += qty;
          updateList(arr);
          isIn = true;
          setCard(arr);
        }
      }
      if (!isIn) {
        for (const [i, el] of productList.entries()) {
          if (el.id === +currentId) {
            productList[i].quantity = qty;
            addToOrderList(productList[i]);
          }
        }
      }
    } else {
      for (const [i, el] of productList.entries()) {
        if (el.id === +currentId) {
          productList[i].quantity = qty;
          addToOrderList(productList[i]);
        }
      }
    }

    setQty(1);
  };
  const removeItem = e => {
    let arr = [];
    const currentId = e.currentTarget.id;
    arr = userOrder;
    for (const [i, el] of arr.entries()) {
      if (el.id === +currentId) {
        if (el.quantity > 1) {
          --el.quantity;
        } else {
          arr.splice(i, 1);
        }
        updateList(arr);
        setCard(arr);
      }
    }
    if (!arr.length) {
      setTotal(0);
      close();
    }
  };
  const close = () => {
    setShowCard(false);
  };
  const decr = e => {
    setCurrentId(e);
    if (qty > 1) setQty(qty => --qty);
  };
  const incr = e => {
    setCurrentId(e);
    if (qty < 100) setQty(qty => ++qty);
  };
  const clearAll = () => {
    updateList([]);
    setTotal(0);
  };
  const openCard = () => {
    if (userOrder.length) {
      setCard(userOrder);
      setShowCard(true);
    }
  };
  return (
    <div className="main">
      <Header total={total} openCard={openCard} mode={"shop"} />
      {showCard ? (
        <div className="checkbox">
          <div className="close" onClick={close}>
            <div className="clear-all" onClick={clearAll}>
              Clear All
            </div>
            <Icon className="cart-close cursor"> clear </Icon>
          </div>
          <div>
            <h2>Shopping Card</h2>
          </div>
          <ul className="pad-ul">
            {card.map((item, index) => {
              return (
                <li key={index}>
                  <div className="product-img">
                    <img
                      src={item.img}
                      width="100"
                      className="prod"
                      alt="product-img"
                    />
                  </div>
                  <div className="product-title">Name: {item.title}</div>
                  <div className="product-price"> Price: $ {item.price}</div>
                  <div className="product-qty"> Qty: 1 X {item.quantity}</div>
                  <div className="product-price">
                    {" "}
                    Total: $ {item.quantity * item.price}
                  </div>
                  <div
                    id={item.id}
                    className="product-price"
                    onClick={e => removeItem(e)}
                  >
                    <Icon className="remove cursor"> delete </Icon>
                  </div>
                </li>
              );
            })}
            <li className="total">
              {" "}
              <div className="flex">
                <div className="product-price">Total:</div>
                <div className="product-price">$ {totalPrice}</div>
              </div>
            </li>
          </ul>
        </div>
      ) : null}

      <div className="product-list">
        {productList.map((item, index) => {
          return (
            <div className="product" key={index}>
              <div className="product-img">
                <img
                  src={item.img}
                  width="170"
                  className="prod"
                  alt="product-img"
                />
              </div>
              <div className="product-title">{item.title}</div>
              <div className="product-price">$ {item.price}</div>
              <div className="stepper">
                <span className="qty">Qty:</span>
                <div className="input-group input-number-group">
                  <div className="input-group-button">
                    <span
                      className="input-number-decrement"
                      onClick={e => decr(item.id)}
                    >
                      -
                    </span>
                  </div>
                  <input
                    className="input-number"
                    type="number"
                    value={currentId === item.id ? qty : 1}
                    onChange={() => {}}
                    min="0"
                    max="1000"
                  />
                  <div className="input-group-button">
                    <span
                      className="input-number-increment"
                      onClick={e => incr(item.id)}
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
              <div className="add">
                <button
                  className="button button-3d"
                  id={item.id}
                  onClick={e => add(e)}
                >
                  <Icon className="cart"> shopping_cart </Icon>Add to Card
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = store => ({
  productList: store.productList,
  userOrder: store.orderList
});
const mapDispatchToProps = dispatch => ({
  setProducts: items => {
    dispatch(setAllProducts(items));
  },
  addToOrderList: items => {
    dispatch(addProduct(items));
  },
  updateList: items => {
    dispatch(updateProduct(items));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
