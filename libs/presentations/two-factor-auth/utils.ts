import { AlgorithmOption, AlgorithmUriOption } from './types';
import { Algorithm } from 'create-hmac';

export function isValidBase32(text: string) {
  return /^[A-Z2-7]+=*$/i.test(text.replace(/\s+/g, ''));
}

export function bytesToHex(bytes: Uint8Array | Buffer | number[]) {
  const arr: number[] = Array.from(bytes as any);
  return arr.map((b) => (b & 0xff).toString(16).padStart(2, '0')).join('');
}

export function algorithmToHmacAlg(
  algorithm: AlgorithmUriOption,
): AlgorithmOption {
  return algorithm === 'SHA1'
    ? 'SHA-1'
    : algorithm === 'SHA256'
      ? 'SHA-256'
      : 'SHA-512';
}

export function algorithmToCreateHmacAlg(
  algorithm: AlgorithmOption,
): Algorithm {
  return algorithm === 'SHA-1'
    ? 'sha1'
    : algorithm === 'SHA-256'
      ? 'sha256'
      : 'sha512';
}
