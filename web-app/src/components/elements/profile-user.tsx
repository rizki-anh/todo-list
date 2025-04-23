import useUserdata from '../store/userdata';

interface props {
  classname: string;
  classed: string;
  classemail: string;
}

export default function ProfileUser({ classname, classed, classemail }: props) {
  const { firstname, email, url } = useUserdata();
  return (
    <>
      <div
        className={`rounded-[50%] bg-white ${classname} mb-2`}
        style={{ backgroundImage: `url(${url})` }}
      ></div>
      <h1 className={`text-white ${classed}`}>{firstname}</h1>
      <h1 className={`text-white ${classemail}`}>{email}</h1>
    </>
  );
}
