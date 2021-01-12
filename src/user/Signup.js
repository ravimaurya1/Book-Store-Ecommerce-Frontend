import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signup } from "../auth/index";
import image from "../core/Girl.jpg";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => {
    return (
      <div
        className="container"
        style={{
          marginTop: "100px",
          marginBottom: "100px",
          boxShadow: "10px 10px 20px skyblue",
        }}
      >
        <div className="row">
          <div class="col-lg-5" style={{ paddingTop: "20px",paddingLeft:"25px" }}>
            <h4>Enter Your Details</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="col-lg-10">
                  <label className="text-muted">Name</label>
                  <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="col-lg-10">
                  <label className="text-muted">Email</label>
                  <input
                    type="email"
                    onChange={handleChange("email")}
                    className="form-control"
                    value={email}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="col-lg-10">
                  <label className="text-muted">Password</label>
                  <input
                    type="password"
                    onChange={handleChange("password")}
                    className="form-control"
                    value={password}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-10">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginTop: "8px",marginBottom:"8px"}}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <p>
                Already have an account? <Link to="/signin">Signin Here</Link>
              </p>
            </form>
          </div>
          <div
            className="col-lg-7"
            style={{ paddingTop: "0px", paddingLeft: "0px", paddingRight:"0px"}}
          >
            <img src={image} className="img-fluid" />
          </div>
        </div>
      </div>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {values.error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        New account is created. Please
        <Link to="/signin">Signin</Link>
      </div>
    );
  };

  return (
    <Layout
      title="Signup"
      description="Signup to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
