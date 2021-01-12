import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getBraintreeClientToken, processPayment,createOrder} from "./apiCore";
import DropIn from "braintree-web-drop-in-react";
import {emptyCart} from './cartHelper';


const Checkout = ({ products, setRun = f =>f, run=undefined }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address:""
  });

  const { user, token } = isAuthenticated();
  let userId = undefined;
  if (user) {
    userId = user._id;
  }

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((res) => {
      if (res.error) {
        setData({ ...data, error: res.error });
      } else {
        setData({ ...data, clientToken: res.clientToken });
      }
    });
  };

  useEffect(() => {
    if (isAuthenticated()) {
      getToken(userId, token);
    }
  }, []);

  const handleAddress = (e)=>{
    setData({...data,address:e.target.value});
  }

  const getTotal = () => {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      sum += products[i].price * products[i].count;
    }
    return sum;
  };

  let deliveryaddress = data.address;

  const buy = () => {
    // send nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
          nonce = data.nonce;
        // console.log(data);
        // nonce = data.nonce;
        // once you have nonce (card type,card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        // console.log("send nonce  and total to process:", nonce, getTotal());
        const paymentData = {
            paymentMethodNonce: nonce,
            amount:getTotal()
        }
        processPayment(userId,token,paymentData)
        .then((res) =>{
            //console.log(res);
            setData({...data,success: res.success});
              //create Order

                const createOrderData = {
                    products: products,
                    transaction_id: res.transaction.id,
                    amount:res.transaction.amount,
                    address: deliveryaddress 

                }
                createOrder(userId,token,createOrderData);



            // Empty the cart after successful transaction
            emptyCart(() =>{
                setRun(!run);
                console.log("payment success and empty cart");
            })
           
        })
      })
      .catch((error) => {
        // console.log(error);
        setData({ ...data, error: error.message });
      });
  };

  const showSuccess = (success) =>{
      if(success){
        return (
            <div className = "alert alert-info">
                {`Your Payment is Successful`}
            </div>
        );
      }
  }

  const showCheckout = () => {
    if (isAuthenticated()) {
      return (
        <div>
          {showDropIn()}
          <button className="btn btn-success btn-block" onClick={buy}>
            Pay
          </button>
        </div>
      );
    } else {
      return (
        <Link to="/signin">
          <button className="btn btn-primary">Sign in to Checkout</button>
        </Link>
      );
    }
  };

  const showDropIn = () => {
    if ((data.clientToken !== null && products.length) > 0) {
      return (
        <div onBlur = {() => setData({...data,error:""})}>
            <div className="form-group mb-3">
                <label className="text-muted">Delivery address:</label>
                <textarea
                    onChange={handleAddress}
                    className ="form-control"
                    value={data.address}
                    placeholder="Type your delivery address here..." 
                />
            </div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => setData({ ...data, instance: instance })}
          />
        </div>
      );
    }
  };

  const showError = (error) => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
