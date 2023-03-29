import React from "react";
import "./Navigation.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/LoginSlice";

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(loginActions.logout());
    navigate("/");
  }

  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="create-cards">Manage Cards</NavLink>
        </li>
        <li>
          <NavLink to="how-it-works">How it works</NavLink>
        </li>
        <li>
          <Link onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
