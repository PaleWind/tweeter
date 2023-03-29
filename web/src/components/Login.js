import React, { useState } from "react";
import { redirect } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
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

  const signIn = (event) => {
    event.preventDefault();
    console.log("event", event);
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      // .then((res) => res.json())
      .then(
        (result) => {
          console.log("tokens", result);
          redirect("/feed");
        },
        (error) => {
          console.log(error);
        }
      );
  };

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
