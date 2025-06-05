import '../../../styles/index.css';
import { useRouteError } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useRefresh from '../hooks/useRefresh';

interface RouteError {
  statusText?: string;
  message?: string;
}

const Error404: React.FC = () => {
  useRefresh();
  const error = useRouteError() as RouteError;
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const increment = (): void => {
    if (count === 5) {
      return setLoading(true);
    } else {
      setCount((prevCount) => prevCount + 1);
    }
  };
  if (loading) {
    localStorage.removeItem('authToken');
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="text-xl my-4">Sorry, an unexpected error has occurred</p>
      <p className="text-2xl">
        {error?.statusText || error?.message || 'Unknown Error'}
      </p>
      <h1>Berapa angka ini: {count}</h1>
      <button
        onClick={increment}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
      >
        Click me
      </button>
    </div>
  );
};

export default Error404;
