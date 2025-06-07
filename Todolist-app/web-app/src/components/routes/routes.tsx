import { createBrowserRouter } from "react-router-dom";
import Error404 from "../pages/Error404";
import LoginPages from "../pages/loginpages";
import RegisterPage from "../pages/Registerpages";
import Dashboard from "../pages/dashboard";
import Vital from "../pages/vitaltask";

export const AppRoutes = createBrowserRouter([
  {
    element: <LoginPages />,
    errorElement: <Error404 />,
    path: "/",
  },
  {
    element: <RegisterPage />,
    errorElement: <Error404 />,
    path: "/register",
  },
  {
    element: <Dashboard />,
    errorElement: <Error404 />,
    path: "/dashboard",
  },
  {
    element: <Vital />,
    errorElement: <Error404 />,
    path: "/vitaltask",
  },
]);

export default AppRoutes;
