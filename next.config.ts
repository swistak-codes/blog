import type { NextConfig } from 'next';
import { withMDX } from './config/mdx';
import { headers } from './config/headers';
import { redirects } from './config/redirects';

const nextConfig: NextConfig = {
  redirects: async () => redirects,
  headers: async () => [
    {
      source: '/(.*)',
      headers,
    },
  ],
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  typescript: {
    ignoreBuildErrors: true, // TODO naprawić to
  },
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: false,
  cleanDistDir: true,
  excludeDefaultMomentLocales: true,
  modularizeImports: {
    'lodash/fp': {
      transform: 'lodash/fp/{{member}}',
    },
    lodash: {
      transform: 'lodash/{{member}}',
    },
    'date-fns': {
      transform: 'date-fns/{{member}}',
    },
  },
  output: 'standalone',
};

const onStartup = () => {
  return withMDX(nextConfig);
};

export default onStartup;
