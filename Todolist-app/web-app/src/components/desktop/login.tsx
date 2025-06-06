import Batik from '../../assets/batik.png';
import loginImage from '../../assets/login-image.png';
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

const LoginForm: React.FC = () => {
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
        setErrorMessage('Terjadi kesalahan, silakan coba lagi' + error);
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
            className="w-[1236px] h-[767px] max-sm:h-[70vh] max-sm:w-[82vw] bg-white 2xl:flex"
            onSubmit={handleSubmit(submit)}
            ref={Formref}
          >
            <div className="flex-1 flex items-end  justify-center flex-col gap-6">
              <h1 className="max-sm:text-4xl font-bold  text-5xl 2xl:pl-14 mb-2  2xl:self-start self-center">
                Sign In
              </h1>
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
              <div className="flex self-start gap-6   flex-row  ml-16 ">
                <input type="checkbox" className="h-5 w-5 self-start " />
                <h1 className="text-xl mt-[-4px]">Remember Me</h1>
              </div>
              <div className="w-[251px] self-start">
                <Button
                  type="submit"
                  className="bg-[#FF9090] text-white w-[129px] h-[60px]  ml-16   "
                >
                  Login
                </Button>
              </div>
              <div className="self-start ml-16 mt-2 ">
                <h1 className="text-xl">
                  Don`t have an account?{' '}
                  <Link to="/register" className="text-blue-400">
                    Create One
                  </Link>
                </h1>
              </div>
            </div>
            <div className="flex-1 items-end justify-end flex ">
              <img
                src={loginImage}
                alt=""
                className="max-sm:hidden max-sm:absolute"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
