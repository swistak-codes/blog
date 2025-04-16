import crypto from 'crypto';
import { v4 } from 'uuid';
import {
  clientSearchHost,
  clientSearchPort,
  clientSearchProtocol,
} from './search-consts-client';

const cdn = 'https://anesthetize.swistak.codes';
const tracker = 'https://radioactive-toy.swistak.codes';
const comments = 'https://synesthesia.swistak.codes';
const search = `${clientSearchProtocol}://${clientSearchHost}${
  [443, 80].includes(clientSearchPort) ? '' : `:${clientSearchPort}`
}`;

export const generateCsp = (): [csp: string, nonce: string] => {
  const production = process.env.NODE_ENV === 'production';

  const hash = crypto.createHash('sha256');
  hash.update(v4());
  const nonce = hash.digest('base64');

  let csp = ``;
  csp += `default-src 'self' ${tracker} ${search};`;
  csp += `base-uri 'self';`;
  csp += `img-src 'self' ${tracker} ${cdn} *.openstreetmap.org data:;`;
  csp += `media-src 'self' ${cdn};`;
  csp += `frame-src 'self' ${cdn} ${comments};`;
  csp += `style-src 'self' ${cdn} 'unsafe-inline';`;
  csp += `script-src 'nonce-${nonce}' 'self' ${tracker} ${
    production ? '' : "'unsafe-eval'"
  };`;
  csp += `font-src ${cdn};`;

  // if (!production) {
  //   csp += `connect-src 'self';`;
  // }

  return [csp, nonce];
};
