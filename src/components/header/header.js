import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import * as logo from "../../images/logo.png";
import { Link, useParams } from "react-router-dom";
import "./header.css";

function Header(props) {
  let { id } = useParams();
  return (
    <header
      id="header"
      className="full-header border-full-header transparent-header dark static-sticky"
    >
      <div id="header-wrap">
        <div className="container clearfix">
          <div id="primary-menu-trigger">
            <i className="icon-reorder" />
          </div>
          <div id="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <nav id="primary-menu">
            <ul className="one-page-menu sf-js-enabled">
              <li>
                <Link to="/" className={!id ? "active" : ""}>
                  {" "}
                  <div>Home</div>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className={id && id === "shop" ? "active" : ""}
                >
                  <div>Shop</div>
                </Link>
              </li>
            </ul>
          </nav>
          <div
            className="top-cart"
            onClick={props.openCard}
            style={{ display: props.mode ? "flex" : "none" }}
          >
            <Icon> shopping_cart </Icon> {props.total}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  openCard: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired
};

export default Header;
