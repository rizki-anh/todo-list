export default async function Key(): Promise<CryptoKey> {
  // Generate kunci AES-GCM (256-bit) untuk enkripsi & dekripsi
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 }, // Algoritma dan panjang kunci
    true, // true agar kunci bisa diekspor
    ['encrypt', 'decrypt'] // Kunci ini bisa digunakan untuk enkripsi & dekripsi
  );
  // Ubah kunci menjadi format JWK (biar bisa disimpan di localStorage)
  const jwk = await crypto.subtle.exportKey('jwk', key);

  // Simpan JWK ke localStorage sebagai string
  localStorage.setItem('encryptionKey', JSON.stringify(jwk));

  return key; // Kembalikan key untuk dipakai
}
