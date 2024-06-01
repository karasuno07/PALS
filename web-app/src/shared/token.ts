import { AES, enc } from 'crypto-js';

const COOKIE_SECRET = process.env.COOKIE_ENCRYPT_KEY || 'secreykey';

export function decryptCookieValue(value: string) {
  const decData = enc.Base64.parse(value).toString(enc.Utf8);
  const bytes = AES.decrypt(JSON.stringify(decData), COOKIE_SECRET).toString(
    enc.Utf8
  );
  return JSON.parse(bytes);
}

export function encryptCookieValue(value: string) {
  const encJson = AES.encrypt(value, COOKIE_SECRET).toString();
  return enc.Base64.stringify(enc.Utf8.parse(encJson));
}
