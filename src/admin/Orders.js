import React, { useState, useEffect } from "react";
import Layout from "../core/Layout.js";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth/index";
import { listOrders, getStatusValues,updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatus = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatus();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return <h2 className="text-danger">Total orders:{orders.length}</h2>;
    } else {
      return <h7 className="text-danger">No Orders</h7>;
    }
  };

  const handleStatusChange = (orderId) => (event) => {
    updateOrderStatus(user._id,token,orderId,event.target.value)
    .then((data)=>{
        if(data.error){
            console.log(data.error);
        }else{
            loadOrders();
        }
    })
  };

  const showStatus = (order) => {
    return (
      <div className="form-group">
        <h3 className=" mb-4">Status: {order.status}</h3>
        <select
          className="form-control"
          onChange={handleStatusChange(order._id)}
        >
            <option>Update Status</option>
            {statusValues.map((status,sIndex) =>{
                return (
                    <option key={sIndex} value={status}>
                        {status}
                    </option>
                );
            })}
        </select>
      </div>
    );
  };

  const showInput = (key, value) => {
    return (
      <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{key}</div>
        </div>
        <input
          type="text"
          value={value}
          className="form-control"
          readOnly
        ></input>
      </div>
    );
  };

  return (
    <Layout
      title="Orders"
      description="Admin can manage all orders here"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8">
          {showOrdersLength()}
          {orders.map((o, oIndex) => {
            return (
              <div
                className="mt-5"
                key={oIndex}
                style={{ borderBottom: "5px solid black" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order ID:{o._id}</span>
                </h2>

                <ul className="list-group mb-2">
                  <li className="list-group-item">{showStatus(o)}</li>
                  <li className="list-group-item">
                    Transaction ID:{o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount:{o.amount}</li>
                  <li className="list-group-item">Ordered By:{o.user.name}</li>
                  <li className="list-group-item">
                    Order on:{moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery address:{o.address}
                  </li>
                </ul>
                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order:{o.products.length}
                </h3>

                {o.products.map((p, pIndex) => {
                  return (
                    <div
                      className="mb-4"
                      key={pIndex}
                      style={{ padding: "20px", border: "1px solid black" }}
                    >
                      {showInput("Product name", p.name)}
                      {showInput("Product price", p.price)}
                      {showInput("Product total", p.count)}
                      {showInput("Product Id", p._id)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
