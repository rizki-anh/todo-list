import DOMPurify from "dompurify";

function Sqldecode(input: string): string {
    let decode: string = input;
    const regexp: RegExp = /%/g;

    // Decode input hingga tidak ada lagi URL encoding
    while (regexp.test(decode)) {
        decode = decodeURIComponent(decode);
    }

    // Regex untuk mendeteksi karakter berbahaya atau kata kunci SQL Injection
    const sqlInjectionPattern: RegExp = /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|EXEC|UNION|OR|AND)\b/gi;

    // Jika input mengandung SQL Injection pattern, bersihkan
    if (sqlInjectionPattern.test(decode) || /['"`;#--]/.test(decode)) {
        decode = decode
            .replace(/['"`;]/g, "") // Hapus tanda kutip (' " `) dan titik koma (;)
            .replace(/--/g, "") // Hapus komentar SQL (double dash "--")
            .replace(sqlInjectionPattern, ""); // Hapus kata kunci SQL berbahaya
    }

    // Gunakan DOMPurify untuk menghindari XSS
    return DOMPurify.sanitize(decode);
}

export default Sqldecode;
