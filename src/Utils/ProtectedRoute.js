import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { ImPower } from "react-icons/im";
import { PowerHackUserContext } from "../context/PowerHackUserContext";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticating } = useContext(PowerHackUserContext);
  let location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="" style={{ paddingTop: "300px" }}>
        <p className="custom-loader">
          <ImPower className="text-warning fs-2" />
        </p>
      </div>
    );
  }

  if (user && user.email) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} />;
};

export default ProtectedRoute;
