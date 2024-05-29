import { AES, enc } from 'crypto-js';

const COOKIE_SECRET = process.env.COOKIE_ENCRYPT_KEY || 'secreykey';

export function decryptCookieValue(encryptedValue: string) {
  return AES.decrypt(encryptedValue, COOKIE_SECRET).toString(enc.Utf8);
}

export function encryptCookieValue(value: string) {
  return AES.encrypt(value, COOKIE_SECRET).toString();
}
