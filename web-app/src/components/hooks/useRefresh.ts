import useTrackUserTime from './useTracktime';
import Encryption from './enkrypt';
import Decrypted from './decrypt';

export default function useRefresh() {
  useTrackUserTime();
  const storagedata = localStorage.getItem('userAccessTimeMinutes');
  const convert = parseFloat(storagedata ?? '0');
  const Refresh = async () => {
    const token = await Decrypted();
    if (convert === 60 || convert > 60) {
      fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: `${token}`, // Optional, if not provided, the server will use the cookie
          expiresInMins: 60, // optional (FOR ACCESS TOKEN), defaults to 60
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          Encryption(data.accessToken);
        });
      localStorage.removeItem('userAccessTimeMinutes');
    }
  };
  Refresh();
}
