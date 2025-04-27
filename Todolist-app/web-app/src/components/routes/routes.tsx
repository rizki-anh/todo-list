import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error404 from '../pages/Error404';
import LoginPages from '../pages/loginpages';
import RegisterPage from '../pages/Registerpages';
import Dashboard from '../pages/dashboard';
import Vital from '../pages/vital';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPages />} errorElement={<Error404 />} />
        <Route
          path="/register"
          element={<RegisterPage />}
          errorElement={<Error404 />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
          errorElement={<Error404 />}
        />
        <Route
          path="/vitaltask"
          element={<Vital />}
          errorElement={<Error404 />}
        />
        <Route
          path="/login"
          element={<LoginPages />}
          errorElement={<Error404 />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
