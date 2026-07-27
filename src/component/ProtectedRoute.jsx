import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
