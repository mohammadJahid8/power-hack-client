import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { PowerHackUserContext } from "../context/PowerHackUserContext";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticating } = useContext(PowerHackUserContext);
  let location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (user && user.email) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} />;
};

export default ProtectedRoute;
