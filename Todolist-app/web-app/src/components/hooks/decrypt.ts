export default async function Decrypted() {
  const jwkjson = localStorage.getItem('encryptionKey');
  const tokenencryptedjson = localStorage.getItem('encryptedToken');
  if (!jwkjson || !tokenencryptedjson) return;

  const jwk = JSON.parse(jwkjson);
  const token = JSON.parse(tokenencryptedjson);

  // Import kembali kunci dari JWK
  const key = await crypto.subtle.importKey(
    'jwk', // Format data kunci
    jwk, // Data kunci JWK
    { name: 'AES-GCM' }, // Algoritma
    true,
    ['decrypt'] // Tujuan hanya untuk dekripsi
  );
  const iv = new Uint8Array(token.iv); // Ubah array IV jadi Uint8Array
  const cipherBytes = Uint8Array.from(atob(token.cipher), (c) =>
    c.charCodeAt(0)
  ); // Ubah base64 ke biner

  // Dekripsi datanya
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv }, // Algoritma dan IV
    key,
    cipherBytes // Data terenkripsi
  );

  const decoder = new TextDecoder(); // Untuk mengubah hasil biner jadi string
  return decoder.decode(decrypted); // Token asli dikembalikan
}
