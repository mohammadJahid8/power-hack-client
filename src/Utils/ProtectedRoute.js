import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { PowerHackUserContext } from "../context/PowerHackUserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(PowerHackUserContext);
  let location = useLocation();

  if (user?.email) {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default ProtectedRoute;
