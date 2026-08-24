import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";

export default function AppProtectedRoutes({ children }) {
  const { isLoggedIn } = useContext(authContext);
  return isLoggedIn ? children : <Navigate to={"/signin"} />;
}
