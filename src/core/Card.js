import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem,updateItem,removeItem } from "./cartHelper";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton= false,
  setRun = f => f,
  run = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span
        className="badge badge-primary badge-pill"
        style={{ color: "#f31515" }}
      >
        In Stock
      </span>
    ) : (
      <span
        className="badge badge-primary badge-pill"
        style={{ color: "#f31515" }}
      >
        Out of Stock
      </span>
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const handleChange =(id) => (e) =>{
    setRun(!run);
    setCount(e.target.value < 1 ? 1: e.target.value);
    if(e.target.value >= 1){
      updateItem(id,e.target.value);
    }
  }

  const showCartUpdateOptions = (cartUpdate) => {
    if (cartUpdate) {
      return (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange ={handleChange(product._id)}
          />
        </div>
      );
    }
  };

  const showRemoveButton = (showRemoveProductButton) =>{
    if(showRemoveProductButton){
      return (
        <button
          onClick = {() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className = "btn btn-outline-danger mt-2 mb-2"
        > 
          Remove Product
        </button>
      );
    }
  }

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <div className="container">
          <p className="lead mt-2">{product.description.substring(0, 100)}</p>
          <p className="black-9">${product.price}</p>
          <p className="black-8">
            Category:{product.category && product.category.name}
          </p>
          <p className="black-8">
            Added on: {moment(product.createdAt).fromNow()}
          </p>

          {showStock(product.quantity)}

          <br />
          {showViewProductButton && (
            <Link to={`/product/${product._id}`}>
              <button
                className="btn btn-outline-primary mt-2 mb-2"
                style={{ marginRight: "20px" }}
              >
                View Product
              </button>
            </Link>
          )}
          {showAddToCartButton && (
            <Link to="/">
              <button
                onClick={addToCart}
                className="btn btn-outline-warning mt-2 mb-2"
              >
                Add to Cart
              </button>
            </Link>
          )}
        </div>
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
