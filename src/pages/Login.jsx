import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/LoginSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usernameInput, setUsernameInput] = useState("User1234");
  const [passwordInput, setPasswordInput] = useState("pass1234");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const username = "User1234";
  const password = "pass1234";

  function handleUsernameInput(e) {
    setUsernameInput(e.target.value);
  }

  function handlePasswordInput(e) {
    setPasswordInput(e.target.value);
  }

  function handleLogin(e) {
    e.preventDefault();
    if ((usernameInput === username) & (passwordInput === password)) {
      dispatch(loginActions.login());
    }
    setUsernameInput("");
    setPasswordInput("");
  }

  return (
    <>
      <div className="login ">
        <form action="" onSubmit={handleLogin}>
          <h2 className="h2">Login</h2>
          <div className="form-floating">
            <input
              className="form-control"
              defaultValue={usernameInput}
              placeholder="input"
              onChange={handleUsernameInput}
              type="text"
            />
            <label className="form-label" htmlFor="username">
              Username
            </label>
          </div>
          <div className="form-floating">
            <input
              className="form-control"
              defaultValue={passwordInput}
              placeholder="input"
              onChange={handlePasswordInput}
              type="password"
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </>
  );
}
