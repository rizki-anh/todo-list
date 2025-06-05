import { Icon } from '@iconify/react';
interface propsIcon {
  className: string;
  icon: string;
  onClick?: () => void;
}

const Icone = ({ className, icon, onClick }: propsIcon) => {
  return (
    <>
      <Icon icon={icon} className={className} onClick={onClick}></Icon>
    </>
  );
};
export default Icone;
