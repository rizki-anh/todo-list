import Login from "../layout/login";
import { useLocation, Navigate } from "react-router-dom";


const Formlogin = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  if (localStorage.getItem("authToken")) {
    return <Navigate to={from} replace />;
  } else {
    return <Login />;
  }
};

export default Formlogin;
