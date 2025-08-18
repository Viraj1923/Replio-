// PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MyContext } from "./MyContext.jsx";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useContext(MyContext);

  if (loading) return <p>Loading...</p>;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
