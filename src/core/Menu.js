import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";
import "./Menu.css";
import { itemTotal } from "./cartHelper";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const styleLink = () => {
  return {
    color: "rgb(226,226,226)",
    textDecoration: "none",
    letterSpacing: "3px",
    fontWeight: "bold",
  };
};

const Menu2 = ({ history }) => {
  return (
    <nav>
      <div className="logo">
        <h4>Book Store</h4>
      </div>
      <ul className="ravi-link">
        <li>
          <Link style={isActive(history, "/")} style={styleLink()} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            style={isActive(history, "/shop")}
            style={styleLink()}
            to="/shop"
          >
            Shop
          </Link>
        </li>
        <li>
          <Link
            style={isActive(history, "/cart")}
            style={styleLink()}
            to="/cart"
          >
            Cart{" "}
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li>
            <Link
              style={isActive(history, "/user/dashboard")}
              style={styleLink()}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li>
            <Link
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
              style={styleLink()}
            >
              Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li>
              <Link
                to="/signin"
                style={isActive(history, "/signin")}
                style={styleLink()}
              >
                Signin
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                style={isActive(history, "/signup")}
                style={styleLink()}
              >
                Signup
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li>
            <span
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
              style={{ cursor: "pointer", color: "#ffffff" }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

const Menu = ({ history }) => {
  return (
    <div
      style={{ position: "fixed", width: "100%", top: "0px", zIndex: "550" }}
    >
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item" style={{ fontSize: "20px" }}>
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>

        <li className="nav-item" style={{ fontSize: "20px" }}>
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item" style={{ fontSize: "20px" }}>
            <Link
              className="nav-link"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item" style={{ fontSize: "20px" }}>
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item" style={{ fontSize: "20px" }}>
              <Link
                className="nav-link"
                to="/signin"
                style={isActive(history, "/signin")}
              >
                Signin
              </Link>
            </li>
            <li className="nav-item" style={{ fontSize: "20px" }}>
              <Link
                className="nav-link"
                to="/signup"
                style={isActive(history, "/signup")}
              >
                Signup
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item" style={{ fontSize: "20px" }}>
            <span
              className="nav-link"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
              style={{
                cursor: "pointer",
                color: "rgb(226,226,226)",
                letterSpacing: "3px",
                fontWeight: "bold",
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu2);
