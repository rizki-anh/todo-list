import { Icon } from "@iconify/react";
interface propsIcon {
  className: string;
  icon: string;
}

const Icone: React.FC<propsIcon> = ({ className, icon }) => {
  return (
    <>
      <Icon icon={icon} className={className}></Icon>
    </>
  );
};
export default Icone;
