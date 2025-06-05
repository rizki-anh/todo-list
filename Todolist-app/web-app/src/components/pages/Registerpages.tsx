import Register from '../desktop/register';
import useRefresh from '../hooks/useRefresh';
import useDevice from '../hooks/device';
import Mobileregister from '../mobile/registermobile';
import Samsungfold from '../mobile/registerfold';
import Tablet from '../ipad/register';

const LoginRegister = () => {
  useRefresh();
  const device = useDevice();
  if (device === 'Mobile') {
    return <Mobileregister></Mobileregister>;
  } else if (device === 'fold') {
    return <Samsungfold></Samsungfold>;
  } else if (device === 'Tablet') {
    return <Tablet></Tablet>;
  } else {
    return <Register></Register>;
  }
};

export default LoginRegister;
