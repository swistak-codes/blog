import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import { withMDX } from './config/mdx';
import { headers } from './config/headers';
import { redirects } from './config/redirects';

const normalizeUrl = (value: string | undefined): string | undefined => {
  const normalized = value?.trim().replace(/\/+$/, '');

  return normalized || undefined;
};

const onStartup = (phase: string) => {
  const isDevelopmentServer = phase === PHASE_DEVELOPMENT_SERVER;
  const configuredAssetPrefix = normalizeUrl(process.env.NEXT_ASSET_PREFIX);
  const configuredImagePath = normalizeUrl(process.env.NEXT_IMAGE_PATH);
  const assetPrefix = isDevelopmentServer ? undefined : configuredAssetPrefix;

  const imagePath = isDevelopmentServer
    ? '/_next/image'
    : (configuredImagePath ?? '/_next/image');

  const assetUrl = assetPrefix ? new URL(assetPrefix) : undefined;

  const nextConfig: NextConfig = {
    ...(assetPrefix ? { assetPrefix } : {}),

    env: {
      NEXT_PUBLIC_ASSET_PREFIX: assetPrefix ?? '',
    },

    images: {
      path: imagePath,
      qualities: [75],
      formats: ['image/webp'],
      minimumCacheTTL: 2_678_400,
      ...(assetUrl
        ? {
            remotePatterns: [
              {
                protocol: assetUrl.protocol === 'http:' ? 'http' : 'https',
                hostname: assetUrl.hostname,
                port: assetUrl.port,
                pathname: `${assetUrl.pathname.replace(/\/+$/, '')}/**`,
              },
            ],
          }
        : {}),
    },

    redirects: async () => [
      ...redirects,
      ...(assetPrefix
        ? [
            {
              source: '/_next/static/media/:path*',
              destination: `${assetPrefix}/_next/static/media/:path*`,
              permanent: true,
            },
          ]
        : []),
    ],

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
      reactRemoveProperties: !isDevelopmentServer,
      removeConsole: !isDevelopmentServer,
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
