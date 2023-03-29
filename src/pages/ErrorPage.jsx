import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2500);
  }, []);
  return (
    <div className="error">
      <h3>This page doesn't exist.</h3>
      <h3>Redirecting...</h3>
    </div>
  );
}
