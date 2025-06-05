import Login from '../desktop/login';
import { useLocation, Navigate } from 'react-router-dom';
import useRefresh from '../hooks/useRefresh';
import useDevice from '../hooks/device';
import Loginmobile from '../mobile/login';
import Loginipad from '../ipad/login';

const Formlogin = () => {
  const device = useDevice();
  useRefresh();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  if (localStorage.getItem('authToken')) {
    return <Navigate to={from} replace />;
  } else {
    if (device === 'Mobile') {
      return <Loginmobile></Loginmobile>;
    } else if (device === 'Tablet') {
      return <Loginipad></Loginipad>;
    } else {
      return <Login></Login>;
    }
  }
};

export default Formlogin;
