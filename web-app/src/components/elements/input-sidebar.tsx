import Icon from '../elements/icon';
import { Link } from 'react-router-dom';

interface Inputsidebar {
  iconify: string;
  teks: string;
  path: string;
  onClick?: () => void; // onClick bersifat opsional
}

export default function Inputsidebar({
  iconify,
  teks,
  path,
  onClick,
}: Inputsidebar) {
  return (
    <>
      <Link to={path} onClick={onClick}>
        <button
          className="w-[288px] h-[59px] rounded-[14px] z-0 hover:bg-white flex gap-6 items-center group pl-2"
          type="button"
        >
          <Icon
            icon={iconify}
            className="text-white group-hover:text-[#FF6767] text-3xl"
          />
          <h1 className="text-white group-hover:text-[#FF6767] text-xl">
            {teks}
          </h1>
        </button>
      </Link>
    </>
  );
}
