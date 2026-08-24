import React, { useContext } from "react";
import { authContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AuthProtectedRoutes({ children }) {
  const { isLoggedIn } = useContext(authContext);
  return isLoggedIn ? <Navigate to={"/"} /> : children;
}
