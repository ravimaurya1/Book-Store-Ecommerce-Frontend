import React, { useState } from "react";
import Layout from "../core/Layout";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/index";
import image from "../core/Girl.jpg";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signInForm = () => {
    return (
      <div
        className="container"
        style={{ marginTop: "100px", marginBottom: "100px",boxShadow:"10px 10px 20px skyblue"}}
      >
        <div className="row">
          <div className="col-lg-7" style={{ paddingTop: "0px" ,paddingLeft:"0px"}}>
            <img src={image} className="img-fluid" />
          </div>
          <div class="col-lg-5" style={{paddingTop:"20px"}}>
            <h4>Sign into your account</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="col-lg-10">
                  <label className="text-muted">Email</label>
                  <input
                    type="email"
                    onChange={handleChange("email")}
                    className="form-control"
                    value={email}
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
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
                    style={{ marginTop: "8px",marginBottom:"9px" }}
                  >
                    Signin
                  </button>
                </div>
              </div>
              <p>
                Don't have an account? <Link to="/signup">Signup Here</Link>
              </p>
            </form>
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

  const showLoading = () => {
    if (loading) {
      return (
        <div className="alert alert-info">
          <h2>Loading....</h2>
        </div>
      );
    }
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user.role == 0) {
        return <Redirect to="/user/dashboard" />;
      } else if (user.role == 1) {
        return <Redirect to="/admin/dashboard" />;
      }
    }
    if (isAuthenticated() && isAuthenticated().user.role === 1) {
      return <Redirect to="/admin/dashboard" />;
    }
    if (isAuthenticated() && isAuthenticated().user.role === 0) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  return (
    <Layout
      title="Signin"
      description="Signin to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      <p>For Testing-</p>
      <p>Admin email- ravi@email.com password-123456789</p>
      <p>User email- user@email.com password-987654321</p>
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
