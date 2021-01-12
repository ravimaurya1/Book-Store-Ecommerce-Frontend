import React, { useState } from "react";
import Layout from "../core/Layout.js";
import {Link} from "react-router-dom";

import { isAuthenticated } from "../auth/index";
import {createCategory} from './apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdName, setCreatedName] = useState('');

  //destructure user token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
    setCreatedName('');
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // make request to api create category
    createCategory(user._id,token,{name})
    .then((data) =>{
      if(data.error){
        setError(data.error);
      }
      else{
        setCreatedName(name);
        setError("");
        setSuccess(true);
        setName("");
      }
    })
  };

  const newCategoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            autoFocus
            required
          ></input>
        </div>
        <button className="btn btn-outline-primary m-2">Create Category</button>
      </form>
    );
  };

  const showSuccess = ()=>{
    if(success){
      return <h3 className = "text-success">{createdName} is created</h3>
    }
  }

  const showError =() =>{
    if(error){
      return <h3 className="text-danger">Duplicate key is not allowed</h3>
    }
  }

  const goBack = () =>{
    return (
    <div className= "mt-5">
      <Link to="/admin/dashboard" className="text-warning btn btn-primary">
          Back to Dashboard
      </Link>
    </div>
    );
  }

  return (
    <Layout
      title="Add a new Category"
      description={`Ready to add a new Category`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {createdName && showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
          </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
