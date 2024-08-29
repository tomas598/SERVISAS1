import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../authService/AuthService";
import { Home } from "../home/Home";

const PrivateRoute = ({ element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setAuthenticated(authStatus);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Optionally, add a loading spinner here
  }

  return authenticated ? <Home /> : <Navigate to="/login" />;
};

export default PrivateRoute;
