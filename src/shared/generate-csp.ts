import crypto from 'node:crypto';
import {
  clientSearchHost,
  clientSearchPort,
  clientSearchProtocol,
} from './search-consts-client';

const cdn = 'https://lightbulb-sun.swistak.codes';
const tracker = 'https://radioactive-toy.swistak.codes';
const comments = 'https://synesthesia.swistak.codes';

const search = `${clientSearchProtocol}://${clientSearchHost}${
  [443, 80].includes(clientSearchPort) ? '' : `:${clientSearchPort}`
}`;

export const generateCsp = (): [csp: string, nonce: string] => {
  const production = process.env.NODE_ENV === 'production';

  const nonce = crypto.randomBytes(16).toString('base64');

  const directives = [
    `default-src 'self'`,
    `base-uri 'self'`,
    `img-src 'self' ${tracker} ${cdn} *.openstreetmap.org data:`,
    `media-src 'self' ${cdn}`,
    `frame-src 'self' ${cdn} ${comments}`,
    `style-src 'self' ${cdn} 'unsafe-inline'`,
    `script-src 'nonce-${nonce}' 'self' ${cdn} ${tracker}${
      production ? '' : " 'unsafe-eval'"
    }`,
    `font-src 'self' ${cdn}`,
    `connect-src 'self' ${tracker} ${search} ${cdn}`,
    `object-src 'none'`,
  ];

  return [`${directives.join('; ')};`, nonce];
};
