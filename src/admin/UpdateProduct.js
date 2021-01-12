import React, { useState, useEffect } from "react";
import Layout from "../core/Layout.js";
import { Link,Redirect } from "react-router-dom";

import { isAuthenticated } from "../auth/index";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";

const UpdateProduct = (props) => {
  //destructure user token from localstorage
  const { user, token } = isAuthenticated();

  // Create State
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
    file: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    photo,
    createdProduct,
    redirectToProfile,
    formData,
    file,
  } = values;

  // Load Single Product Information

  const init = (productId) =>{
      getProduct(productId)
      .then((data)=>{
          if(data.error){
              setValues({...values,error:data.error});
          }else{
            // populate the state
            setValues({
                ...values,
                name:data.name,
                description:data.description,
                price: data.price,
                category: data.category._id,
                shipping: data.shipping,
                quantity: data.quantity,
            });
            // load Categories
            initCategories();
          }
      })
  }

  // load  Categories from backend and set form data

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({categories: data, formData: new FormData()});
      }
    });
  };



  // This run when our componet did mount
  useEffect(() => {
    init(props.match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    if (name === "photo") {
      setValues({
        ...values,
        [name]: value,
        file: URL.createObjectURL(event.target.files[0]),
        error:"",
        createdProduct:""
      });
    } else {
      setValues({ ...values, [name]: value,error:"",createdProduct:""});
    }
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(props.match.params.productId,user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          redirectToProfile:true,
          createdProduct: data.name,
          file:""
        });
      }
    });
  };

  // Component to show photo

  const newPostForm = () => {
    return (
      <form className="mb-3" onSubmit={clickSubmit}>
        <h4>Post Photo</h4>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
            />
          </label>
          <img
            className="img-thumbnail ml-3"
            width="200"
            src={file}
            alt="Upload Image"
          ></img>
        </div>

        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            name="name"
            className="form-control"
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            onChange={handleChange("description")}
            name="description"
            className="form-control"
            value={description}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            onChange={handleChange("price")}
            type="number"
            name="name"
            className="form-control"
            value={price}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Category</label>
          <select onChange={handleChange("category")} className="form-control">
            <option>Please Select</option>
            {categories &&
              categories.map((c, i) => {
                return (
                  <option value={c._id} key={i}>
                    {c.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select onChange={handleChange("shipping")} className="form-control">
            <option>Please Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            onChange={handleChange("quantity")}
            type="number"
            name="name"
            className="form-control"
            value={quantity}
          />
        </div>

        <button className="btn btn-outline-primary">Update Product</button>
      </form>
    );
  };

  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };

  const showSuccess = () => {
    if (createdProduct) {
      return (
        <div className="alert alert-info">
          <h2>{`${createdProduct}`} is Updated!</h2>
        </div>
      );
    }
  };

  const showLoading = () => {
    if (loading) {
      return (
        <div className="alert alert-success">
          <h2>Loading...</h2>
        </div>
      );
    }
  };

  const redirectUser = () =>{
      if(redirectToProfile){
          if(!error){
              return <Redirect to="/" />;
          }
      }
  };

  return (
    <Layout
      title="Update the  Product"
      description={`Ready to Update Product`}
      className="container-fluid"
    >
        {console.log(values)}
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
