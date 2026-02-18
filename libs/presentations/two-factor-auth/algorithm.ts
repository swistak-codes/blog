import { BASE32_ALPHABET } from './consts';
import { AlgorithmOption } from './types';
import { algorithmToCreateHmacAlg } from './utils';

// funkcja pomocnicza do konwersji base32 na buffer
function base32ToBuffer(base32: string) {
  // najpierw konwertujemy każdy znak na 5-bitową reprezentację tworząc tym samym ciąg bitów
  let bits = '';
  for (const char of base32.replace(/=+$/, '')) {
    const val = BASE32_ALPHABET.indexOf(char.toUpperCase());
    if (val === -1) throw new Error('Nieznany znak');
    bits += val.toString(2).padStart(5, '0');
  }
  // następnie grupujemy bity w 8-bitowe bajty i konwertujemy na liczby, które tworzą ostateczny buffer
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return Buffer.from(bytes);
}

// funkcja pomocnicza do konwersji liczby na 8-bajtową tablicę bajtów (big-endian)
function numberToBuffer(num: bigint) {
  // w Node.js można użyć Buffer.alloc(8) i buffer.writeBigUInt64BE(num)
  // ale tutaj zrobimy to ręcznie, żeby działąło w przeglądarce
  const array = new Uint8Array(8);
  for (let i = 7; i >= 0; i--) {
    array[i] = Number(num & 0xffn);
    num >>= 8n;
  }
  return array;
}

// funkcja do generowania HMAC dla podanej wiadomości i klucza, z możliwością wyboru algorytmu
async function hmac(
  key: Buffer,
  message: Uint8Array,
  algorithm: AlgorithmOption,
) {
  // jeśli Web Crypto API nie jest dostępne, używamy alternatywnej implementacji
  if (!crypto || !crypto.subtle) {
    return await hmacAlternative(key, message, algorithm);
  }
  // importujemy klucz do formatu akceptowanego przez Web Crypto API
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: algorithm },
    false,
    ['sign'],
  );
  // generujemy podpis HMAC dla podanej wiadomości
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, message);
  return new Uint8Array(signature);
}

async function hmacAlternative(
  key: Buffer,
  message: Uint8Array,
  algorithm: AlgorithmOption,
) {
  // implementacja z biblioteki create-hmac
  // w Node moglibyśmy użyć natywnego crypto.createHmac, który działa tak samo
  const { default: createHmac } = await import('create-hmac');
  const hmac = createHmac(algorithmToCreateHmacAlg(algorithm), key);
  hmac.update(message);
  return hmac.digest();
}

// funkcja do generowania kodu HOTP, która przyjmuje klucz, licznik, liczbę cyfr i algorytm
export async function hotp(
  key: string,
  counter: bigint,
  digits: number,
  algorithm: AlgorithmOption,
) {
  // konwertujemy klucz na buffer
  const keyBuffer = base32ToBuffer(key);
  // konwertujemy licznik na 8-bajtową tablicę bajtów
  const counterBuffer = numberToBuffer(counter);
  // generujemy HMAC dla licznika
  const hmacResult = await hmac(keyBuffer, counterBuffer, algorithm);
  // dynamiczne przycinanie: pobieramy offset z ostatniego bajtu HMAC
  const offset = hmacResult[hmacResult.length - 1] & 0xf;
  // wyciągamy 4 bajty zaczynając od offsetu i tworzymy z nich liczbę
  const code =
    ((hmacResult[offset] & 0x7f) << 24) |
    ((hmacResult[offset + 1] & 0xff) << 16) |
    ((hmacResult[offset + 2] & 0xff) << 8) |
    (hmacResult[offset + 3] & 0xff);
  // wynikowy HOTP to kod modulo 10^digits, sformatowany jako string z zerami wiodącymi
  const hotpCode = (code % 10 ** digits).toString().padStart(digits, '0');
  // zwracamy wygenerowane po drodze dane:
  return {
    hotpCode,
    hmacResult,
    offset,
    code,
  };
}

// funkcja do generowania kodu TOTP, która przyjmuje klucz, okres, liczbę cyfr i algorytm
export async function totp(
  key: string,
  timeStep: number,
  digits: number,
  algorithm: AlgorithmOption,
) {
  // obliczamy aktualny licznik na podstawie czasu i okresu
  const now = Math.floor(Date.now() / 1000);
  const counter = BigInt(Math.floor(now / timeStep));
  // generujemy kod HOTP dla obliczonego licznika
  const hotpResult = await hotp(key, counter, digits, algorithm);
  return {
    ...hotpResult,
    now,
    counter,
  };
}
