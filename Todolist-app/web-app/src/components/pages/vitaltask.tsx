import VitalDesktop from "../desktop/vitaldesktop";
import VitalMobile from "../mobile/vitalmobile";
import VitalTablet from "../ipad/vitalipad";
import useDevice from "../hooks/device";
import useRefresh from "../hooks/useRefresh";


export default function VitalTask() {
  useRefresh();
  const device = useDevice();
  if (device === "Mobile") {
    return <VitalMobile></VitalMobile>;
  } else if (device === "Tablet") {
    return <VitalTablet></VitalTablet>;
  } else {
    return <VitalDesktop></VitalDesktop>;
  }
}
