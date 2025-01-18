import { useNavigate, Navigate } from "react-router-dom";
import { ROUTES } from "../constants";

const PrivateRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");

  if (!userId) return <Navigate to={ROUTES.HOME} />;

  return children;
};

export default PrivateRoute;
