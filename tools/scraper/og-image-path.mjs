const versionedImagePattern = /\.([a-f0-9]+)\.([a-z0-9]+)$/i;

export function getOgImagePath(imageUrl, slug) {
  if (!slug) {
    throw new Error('Cannot create OG image path without an article slug');
  }

  const parsedUrl = new URL(imageUrl, 'http://localhost');
  const existingOgPath = parsedUrl.pathname.match(
    /^\/(?:prod\/|staging\/)?(og\/.+)$/,
  );

  if (existingOgPath) {
    return `/${existingOgPath[1]}${parsedUrl.search}`;
  }

  const fileName = parsedUrl.pathname.split('/').at(-1) ?? '';
  const versionedImage = fileName.match(versionedImagePattern);
  const extension =
    versionedImage?.[2] ?? fileName.match(/\.([a-z0-9]+)$/i)?.[1];

  if (!extension) {
    throw new Error(`Cannot determine OG image extension from ${imageUrl}`);
  }

  const version = versionedImage?.[1];
  const versionQuery = version ? `?v=${version}` : '';

  return `/og/${encodeURIComponent(slug)}.${extension.toLowerCase()}${versionQuery}`;
}
