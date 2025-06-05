import DOMPurify from 'dompurify';

export default function Sqldecode(input: string): string {
  let decode: string = input;
  const regexp: RegExp = /%/g;
  const base64Regex =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

  // Decode input hingga tidak ada lagi URL encoding
  if (regexp.test(decode)) {
    while (regexp.test(decode)) {
      decode = decodeURIComponent(decode);
    }
  } else {
    while (base64Regex.test(decode)) {
      decode = atob(decode);
    }
  }

  // Regex untuk mendeteksi karakter berbahaya atau kata kunci SQL Injection
  const sqlInjectionPattern: RegExp =
    /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|EXEC|UNION|OR|AND)\b/gi;

  // Jika input mengandung SQL Injection pattern, bersihkan
  if (sqlInjectionPattern.test(decode) || /['"`;#--]/.test(decode)) {
    decode = decode
      .replace(/['"`;]/g, '') // Hapus tanda kutip (' " `) dan titik koma (;)
      .replace(/--/g, '') // Hapus komentar SQL (double dash "--")
      .replace(sqlInjectionPattern, ''); // Hapus kata kunci SQL berbahaya
  }

  // Gunakan DOMPurify untuk menghindari XSS
  return DOMPurify.sanitize(decode);
}
