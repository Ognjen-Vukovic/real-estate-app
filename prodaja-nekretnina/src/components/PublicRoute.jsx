import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  if (userId) return <Navigate to={ROUTES.NEKRETNINE} />;

  return children;
};

export default PublicRoute;
