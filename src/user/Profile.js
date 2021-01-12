import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link,Redirect } from "react-router-dom";
import { read, update, userUpdate } from "./apiUser";

const Profile = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const { user, token } = isAuthenticated();
  const { name, password, error, success, email } = values;

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          name: data.name,
          email: data.email,
        });
      }
    });
  };

  useEffect(() => {
    init(props.match.params.userId);
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, error: false });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    console.log("name:",name,"email:",email,"password",password);
    update(props.match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          userUpdate(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = () =>{
        if(success){
            return <Redirect to="/cart" />;
        }
  }

  const profileUpdate = (name, email, password) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input type="email" className="form-control" value={email} readOnly />
        </div>
        <div className="form-group">
          <label className="text-muted">New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={handleChange("password")}
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Profile Update</h2>
      {profileUpdate(name, email, password)}
      { redirectUser()}
    </Layout>
  );
};

export default Profile;
