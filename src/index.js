import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Shop from "./App";
import { Home } from "./components/home/home";
import Header from "./components/header/header";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import reducers from "./store/reducers";
import * as serviceWorker from "./serviceWorker";

const store = createStore(reducers, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route
        exact
        path="/"
        render={() => (
          <div className="main">
            <Header />
            <Home />
          </div>
        )}
      />

      <Route exact path="/:id" component={Shop} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
