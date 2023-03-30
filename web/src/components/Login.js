import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Login = () => {
  let navigate = useNavigate();

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [authMode, setAuthMode] = useState("signin");

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  async function signIn(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: "aoi", //username,
        password: "pass", //password,
      });
      // console.log("token", response.data.accessToken);
      let token = response.data.accessToken;
      const exp = jwt_decode(token);
      const expirationTime = new Date(exp * 1000);
      Cookies.set("token", token, { expires: expirationTime });
      if (token) {
        navigate("/feed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="Auth-form"
        >
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="email"
                value={username}
                onChange={handleUsernameChange}
                className="form-control mt-1"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="form-control mt-1"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              {/* <button onClick={(e) => signIn(e)} className="btn btn-primary"> */}
              <button onClick={(e) => signIn(e)} className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              {/* Forgot <a href="#">password?</a> */}
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input type="email" className="form-control mt-1" />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input type="email" className="form-control mt-1" />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input type="password" className="form-control mt-1" />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            {/* Forgot <a href="#">password?</a> */}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
