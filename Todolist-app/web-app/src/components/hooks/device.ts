import { useState, useEffect } from 'react';

const useDeviceType = () => {
  const [device, setDevice] = useState('');

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width === 344) {
        setDevice('fold');
      } else if (width < 768) {
        setDevice('Mobile');
      } else if (height === 600 || height === 800) {
        setDevice('NestHub');
      } else if (width >= 768 && width <= 1024) {
        setDevice('Tablet');
      } else {
        setDevice('Desktop');
      }
    };
    detectDevice(); // Deteksi saat pertama kali halaman dimuat
    window.addEventListener('resize', detectDevice); // Update jika layar di-resize
    return () => window.removeEventListener('resize', detectDevice); // Bersihkan event listener
  }, []);
  return device;
};

export default useDeviceType;
