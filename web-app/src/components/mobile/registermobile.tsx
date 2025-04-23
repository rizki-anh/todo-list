import Batik from '../../assets/batik.png';
import Icon from '../elements/icon';
import Button from '../elements/button';
import '../../../styles/index.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Ratelimiiter from '../hooks/ratelimiit';
import Filter from '../hooks/filter';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const schema = z.object({
  username: z
    .string()
    .min(6, 'Username harus minimal 6 karakter')
    .max(20, 'Username maksimal 20 karakter')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username hanya boleh mengandung huruf, angka, dan underscore'
    ),
  email: z.string().email('email tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung setidaknya 1 huruf besar')
    .regex(/[a-z]/, 'Password harus mengandung setidaknya 1 huruf kecil')
    .regex(/[0-9]/, 'Password harus mengandung setidaknya 1 angka')
    .regex(/[^A-Za-z0-9]/, 'Password harus mengandung setidaknya 1 simbol'),
  confirmpassword: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung setidaknya 1 huruf besar')
    .regex(/[a-z]/, 'Password harus mengandung setidaknya 1 huruf kecil')
    .regex(/[0-9]/, 'Password harus mengandung setidaknya 1 angka')
    .regex(/[^A-Za-z0-9]/, 'Password harus mengandung setidaknya 1 simbol'),
});

type Registervalidasi = z.infer<typeof schema>;
interface InputField {
  name: string;
  type: 'text' | 'email' | 'password'; // Hanya menerima tipe tertentu
  icon: string;
  dataregister: keyof Registervalidasi;
}
const Mobileregister: React.FC = () => {
  const Formref = useRef<HTMLFormElement>(null);
  const Checkbox = useRef<HTMLInputElement>(null);
  const [Passnomatch, setPassnomatch] = useState('');
  const Navigate = useNavigate();
  const button = Ratelimiiter(5, 5000);
  const { register, handleSubmit } = useForm<Registervalidasi>({
    resolver: zodResolver(schema),
  });
  const mapping: InputField[] = [
    {
      name: 'Enter Username',
      type: 'text',
      icon: 'uis:user-md',
      dataregister: 'username',
    },
    {
      name: 'Enter Email',
      type: 'email',
      icon: 'mdi:email',
      dataregister: 'email',
    },
    {
      name: 'Enter Passworld',
      type: 'password',
      icon: 'mdi:password',
      dataregister: 'password',
    },
    {
      name: 'Enter You Age',
      type: 'password',
      icon: 'arcticons:broken-age',
      dataregister: 'confirmpassword',
    },
  ];

  const submit = async (data: Registervalidasi) => {
    if (Checkbox.current?.checked) {
      if (data.password === data.confirmpassword) {
        if (button()) {
          try {
            const respon = await fetch('https://dummyjson.com/users/add', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: Filter(data.username),
                email: Filter(data.email),
                password: Filter(data.password),
                confirmpassword: Filter(data.confirmpassword),
                /* other user data */
              }),
            });
            const responData = await respon.json();
            console.log(responData);
            if (responData.message) {
              throw new Error(responData.message);
            }
            Navigate('/');
            Formref.current?.reset();
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        setPassnomatch('Password Tidak Sama');
        Formref.current?.reset();
      }
    }
  };

  return (
    <>
      <div className="container">
        <div
          className="w-screen h-screen bg bg-[#FF6767] flex justify-center items-center"
          style={{ backgroundImage: `url(${Batik})` }}
        >
          <form
            className="h-[75vh] w-[82vw] bg-white flex  justify-center"
            onSubmit={handleSubmit(submit)}
            ref={Formref}
          >
            <div className="pt-4">
              <h1 className=" text-3xl font-bold text-center mb-5">Sign Up</h1>
              <div className="flex flex-col gap-6">
                {mapping.map((item, index) => {
                  return (
                    <div className="flex items-center relative z-0" key={index}>
                      <Icon
                        icon={item.icon}
                        className="absolute pl-2 text-3xl z-10"
                      ></Icon>
                      <input
                        key={index}
                        {...register(item.dataregister)}
                        type={item.type}
                        placeholder={item.name}
                        className="border border-black rounded-lg  text-xl  w-[281px] h-[45px] pl-9"
                      ></input>
                    </div>
                  );
                })}
                <h1
                  className={
                    Passnomatch === ''
                      ? 'hidden '
                      : 'w-[281px] mt-[-12px] mb-[-6px]  text-[#FF9090]'
                  }
                >
                  {Passnomatch}
                </h1>
                <div className="w-[82wv] flex gap-2">
                  <input type="checkbox" className="h-5 w-5" ref={Checkbox} />
                  <h1 className="text-xl mt-[-4px] ">I agree to all terms</h1>
                </div>
                <div className="w-[82wv]">
                  <Button
                    type="submit"
                    className="bg-[#FF9090] text-white self-start h-10 w-18 mb-[-10px]"
                  >
                    Register
                  </Button>
                </div>
                <div className="max-sm:w-[281px] 2xl:mb-[6px] max-sm:relative max-sm:top-[-6px]">
                  <h1 className="2xl:text-xl">
                    Already have an account?{' '}
                    <Link to="/" className="text-blue-400">
                      Sign In
                    </Link>
                  </h1>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Mobileregister;
