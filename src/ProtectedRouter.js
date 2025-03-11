import React from "react";
import { UseSelector, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Public Protection
function ProtectedRouter() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;
}

// Admin protection
function AdminProtectedRoute() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return userInfo?.token ? (
    userInfo?.isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/*" />
    )
  ) : (
    <Navigate to="/login" />
  );
}

export { ProtectedRouter, AdminProtectedRoute };
