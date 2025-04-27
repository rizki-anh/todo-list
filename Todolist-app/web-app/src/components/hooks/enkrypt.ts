import Key from './jwk';

export default async function Encryption(token: string) {
  const encoder = new TextEncoder();
  const key = await Key();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // IV = random data untuk keamanan ekstra (harus disimpan juga)
  // Enkripsi token dengan AES-GCM
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv }, // Algoritma + IV
    key, // Kunci untuk enkripsi
    encoder.encode(token) // Data token dalam bentuk biner
  );
  const Encryptedtoken = {
    iv: Array.from(iv), // Simpan IV dalam bentuk array (karena nggak bisa simpan Uint8Array langsung)
    cipher: btoa(String.fromCharCode(...new Uint8Array(encrypted))), // Ubah hasil enkripsi ke Base64 string
  };
  // Simpan encrypted token ke localStorage
  localStorage.setItem('encryptedToken', JSON.stringify(Encryptedtoken));
}
