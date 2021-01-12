import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductByArrival();
    loadProductBySell();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Buy Programming Book With Us"
      className="container-fluid"
    >
      <div>
        <Search />
        <hr />
        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
          Best Sellers
        </h2>
        <hr />
        <div className="row">
          {productsBySell.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-3">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <h2 className="mb-4" style={{ fontWeight: "bold" }}>
        New Arrivals
      </h2>
      <hr />
      <div className="row">
        {productsByArrival.map((product, index) => {
          return (
            <div key={index} className="col-4 mb-3">
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
