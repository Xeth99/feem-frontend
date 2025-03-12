import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Public Protection
function ProtectedRouter() {
  const { userInfo } = useSelector((state) => state.userLogin);

  const isAuthenticated = useMemo(() => !!userInfo?.token, [userInfo]);

  if (isAuthenticated === false) return <Navigate to="/login" replace />;

  return <Outlet />;
}

// Admin Protection
function AdminProtectedRoute() {
  const { userInfo } = useSelector((state) => state.userLogin);

  const isAdmin = useMemo(() => userInfo?.isAdmin, [userInfo]);

  if (!userInfo?.token) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}

export { ProtectedRouter, AdminProtectedRoute };
