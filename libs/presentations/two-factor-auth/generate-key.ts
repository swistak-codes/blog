import { BASE32_ALPHABET } from '@swistak-codes/presentations/two-factor-auth/consts';

// funkcja generująca losowy klucz w formacie base32, który może być użyty jako sekret dla TOTP
export function generateKey(length: number = 20): string {
  let key = '';
  for (let i = 0; i < length; i++) {
    // używamy Math.random, więc jest to rozwiązanie niekryptograficzne, ale wystarczające do celów demonstracyjnych
    const randomIndex = Math.floor(Math.random() * BASE32_ALPHABET.length);
    key += BASE32_ALPHABET[randomIndex];
  }
  return key;
}
