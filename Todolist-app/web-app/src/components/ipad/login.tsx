import Batik from '../../assets/batik.png';
import { useForm } from 'react-hook-form';
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../elements/button';
import Icon from '../elements/icon';
import Filter from '../hooks/filter';
import RateLimiiter from '../hooks/ratelimiit';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Encryption from '../hooks/enkrypt';
import loginImage from '../../assets/login-image.png';

const Schema = z.object({
  username: z.string().min(3, 'Username must be at least 6 characters'),
  password: z.string().min(3, 'Password must be at least 6 characters'),
});

type LoginInput = z.infer<typeof Schema>;

const Loginform: React.FC = () => {
  const Formref = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const button = RateLimiiter(5, 5000);
  const { register, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(Schema),
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
            ref={Formref}
            onSubmit={handleSubmit(submit)}
            className="h-[86vh] w-[85vw] bg-white flex  flex-col items-center"
          >
            <div className=" mb-4 w-[30vw] h-[30vh] ">
              <img src={loginImage} alt="" className="w-[30vw] h-[30vh]" />
            </div>
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-4xl font-bold ">Sign In</h1>
              <div className="w-[559px] flex items-center relative">
                <Icon
                  icon="mynaui:user-solid"
                  className="text-4xl absolute  pl-2"
                />
                <input
                  type="text"
                  {...register('username')}
                  placeholder="Enter Username"
                  className="h-[60px] w-full border border-black rounded-lg pl-12 "
                  autoComplete="username"
                />
              </div>
              <div className="w-[559px] flex items-center relative">
                <Icon icon="mdi:password" className="text-4xl absolute pl-2" />
                <input
                  type="password"
                  {...register('password')}
                  placeholder="Enter Password"
                  className="h-[60px] w-full  border border-black rounded-lg pl-12 "
                  autoComplete="password"
                />
              </div>
              <div
                className={
                  errorMessage ? 'w-[559px] flex items-center ' : 'hidden'
                }
              >
                {errorMessage && (
                  <h1 className="text-red-500 font-bold text-xl self-start">
                    Username atau Password salah
                  </h1>
                )}
              </div>
              <div className="flex self-start gap-6  flex-row w-[559px] ">
                <input type="checkbox" className="h-5 w-5 self-start " />
                <h1 className="text-xl mt-[-4px]">Remember Me</h1>
              </div>
              <div className="w-[559px] self-start ">
                <Button
                  type="submit"
                  className="bg-[#FF9090] text-white w-[129px] h-[60px] "
                >
                  Login
                </Button>
              </div>
              <div className="self-start  mt-2 ">
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
