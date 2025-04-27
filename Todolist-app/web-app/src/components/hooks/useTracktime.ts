import { useEffect } from 'react';

export default function useTrackUserTime() {
  useEffect(() => {
    const startTime = performance.now(); // Waktu mulai (ms)

    const handleTrack = () => {
      const endTime = performance.now(); // Waktu saat keluar halaman
      const sessionDurationMs = endTime - startTime; // Hitung durasi sesi (ms)
      const sessionDurationMinutes = parseFloat(
        (sessionDurationMs / 60000).toFixed(2)
      ); // Konversi ke menit

      // Ambil data sebelumnya dari localStorage (kalau ada)
      const storedData = localStorage.getItem('userAccessTimeMinutes');
      const previousDuration = storedData ? parseFloat(storedData) : 0;

      const totalDuration = (previousDuration + sessionDurationMinutes).toFixed(
        2
      ); // Total durasi

      // Simpan total durasi ke localStorage
      localStorage.setItem('userAccessTimeMinutes', totalDuration);
    };

    window.addEventListener('beforeunload', handleTrack); // Trigger saat halaman ditutup

    return () => {
      window.removeEventListener('beforeunload', handleTrack); // Bersihkan listener
    };
  }, []);
}
