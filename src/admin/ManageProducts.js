import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr/>
          <ul className="list-group">
            {products.map((p,index)=>{
              return (
                <li key= {index}className="list-group-item">
                  <strong>{p.name}</strong>
                  <br/>
                  <Link to={`/admin/product/update/${p._id}`}>
                    <button className="btn btn-outline-warning m-4">
                      Update
                    </button>
                  </Link>
                  <button onClick={() =>{destroy(p._id)}} className="btn btn-outline-danger">
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
