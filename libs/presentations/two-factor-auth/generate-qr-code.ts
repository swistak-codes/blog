import QRCode from 'qrcode';
import { AlgorithmUriOption, OtpType } from './types';

type OtpUriData = {
  algorithm?: AlgorithmUriOption;
  counter?: number;
  digits?: number;
  issuer?: string;
  label?: string;
  period?: number;
  secret: string;
  type: OtpType;
};

// funkcja generująca kod QR dla URI OTP
export async function generateQrCode(uriData: OtpUriData) {
  const { type, label, ...rest } = uriData;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(rest)) {
    if (value !== undefined) {
      params.append(key, value.toString());
    }
  }
  const uri = `otpauth://${type}/${encodeURIComponent(label || '')}?${params.toString()}`;
  const qr = await QRCode.toDataURL(uri);
  return {
    uri,
    qr,
  };
}
