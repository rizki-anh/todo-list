import DashboardTablet from '../ipad/Dashboard';
import DashboardDesktop from '../desktop/dashboard';
import DashboardMobile from '../mobile/dashboard';
import useDevice from '../hooks/device';
import useRefresh from '../hooks/useRefresh';
export default function Dashboard() {
  useRefresh();
  const device = useDevice();
  if (device === 'Mobile') {
    return <DashboardMobile></DashboardMobile>;
  } else if (device === 'Tablet') {
    return <DashboardTablet></DashboardTablet>;
  } else {
    return <DashboardDesktop></DashboardDesktop>;
  }
}
