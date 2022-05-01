import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Component/LoginComponent/Login";
import HomePage from "../Pages/HomePage";
import RegisterPage from "../Pages/RegisterPage";

function PageRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRouter;
