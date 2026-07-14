const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX?.replace(/\/+$/, '');

export const getCdnUrl = (path: string): string => {
  if (!assetPrefix || /^[a-z][a-z\d+.-]*:/i.test(path)) {
    return path;
  }

  return `${assetPrefix}/${path.replace(/^\/+/, '')}`;
};
