import Batik from '../../assets/batik.png';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../elements/button';
import Icon from '../elements/icon';
import Filter from '../hooks/filter';
import RateLimiiter from '../hooks/ratelimiit';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Encryption from '../hooks/enkrypt';

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 6 characters'),
  password: z.string().min(3, 'Password must be at least 6 characters'),
});

type LoginInput = z.infer<typeof schema>;

const Loginform: React.FC = () => {
  const Formref = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const button = RateLimiiter(5, 5000);
  const { register, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(schema),
  });
  const submit = async (data: LoginInput) => {
    if (button()) {
      try {
        const respon = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: Filter(data.username),
            password: Filter(data.password),
            expiresInMins: 60, // optional, defaults to 60
          }),
        });
        const responData = await respon.json();
        if (responData.message) {
          setErrorMessage(responData.message || 'Username atau Password salah');
          Formref.current?.reset();
        }
        const token = responData.accessToken;
        if (token) {
          Encryption(token);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrorMessage('Terjadi kesalahan, silakan coba lagi');
      }
    }
  };
  return (
    <>
      <div className="container">
        <div
          className="w-screen h-screen  bg-[#FF6767] flex justify-center items-center"
          style={{ backgroundImage: `url(${Batik})` }}
        >
          <form
            className="h-[75vh] w-[82vw] bg-white flex justify-center"
            ref={Formref}
            onSubmit={handleSubmit(submit)}
          >
            <div className="pt-4 flex flex-col gap-6 items-center">
              <h1 className="text-4xl font-bold mb-2">Sign In</h1>
              <div className="flex items-center text-center relative z-0">
                <Icon
                  icon="mynaui:user-solid"
                  className="text-3xl absolute  pl-2 z-10"
                />
                <input
                  type="text"
                  {...register('username')}
                  className="border border-black rounded-lg  text-xl  w-[281px] h-[45px] pl-9"
                  autoComplete="current-username"
                  placeholder="Enter Username"
                />
              </div>
              <div className="flex items-center text-center relative z-0">
                <Icon
                  icon="mdi:password"
                  className="absolute text-3xl pl-2 z-10"
                />
                <input
                  type="password"
                  {...register('password')}
                  className="border border-black rounded-lg  text-xl  w-[281px] h-[45px] pl-9"
                  autoComplete="current-password"
                  placeholder="Enter Password"
                />
              </div>
              <div className={errorMessage ? 'w-[281px] flex' : 'hidden'}>
                {errorMessage && (
                  <h1 className="text-red-500  text-xl">
                    Username atau Password salah
                  </h1>
                )}
              </div>
              <div className="flex  gap-6 flex-row w-[281px] ">
                <input type="checkbox" className="h-5 w-5 self-start " />
                <h1 className="text-xl mt-[-4px]">Remember Me</h1>
              </div>
              <div className="w-[281px]  self-center">
                <Button
                  type="submit"
                  className="bg-[#FF9090] text-white w-22 h-10  "
                >
                  Login
                </Button>
              </div>
              <div className="self-start mt-2 w-[281px]">
                <h1 className="text-xl">
                  Don`t have an account?{' '}
                  <Link to="/register" className="text-blue-400">
                    Create One
                  </Link>
                </h1>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Loginform;
