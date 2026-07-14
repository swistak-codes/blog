import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import { withMDX } from './config/mdx';
import { headers } from './config/headers';
import { redirects } from './config/redirects';

const normalizeAssetPrefix = (
  value: string | undefined,
): string | undefined => {
  const normalized = value?.trim().replace(/\/+$/, '');

  return normalized || undefined;
};

const onStartup = (phase: string) => {
  const configuredAssetPrefix = normalizeAssetPrefix(
    process.env.NEXT_ASSET_PREFIX,
  );

  const assetPrefix =
    phase === PHASE_DEVELOPMENT_SERVER ? undefined : configuredAssetPrefix;

  const nextConfig: NextConfig = {
    ...(assetPrefix ? { assetPrefix } : {}),

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

  return withMDX(nextConfig);
};

export default onStartup;
