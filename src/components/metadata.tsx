import { NextSeo, ArticleJsonLd } from 'next-seo';
import {
  AdditionalProps,
  BaseMetadata,
  isPostMetadata,
  PostMetadata,
  RenderedPostMetadata,
} from '@swistak-codes/types';
import logo from '../assets/logo-bg.png';

const url = process.env['NEXT_PUBLIC_BASE_URL'];
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX?.replace(/\/+$/, '');

const getCoverUrl = (
  cover: NonNullable<BaseMetadata['cover']>,
  slug?: string,
) => {
  if (!assetPrefix || !slug) {
    return `${url}${cover.src}`;
  }

  const extension = cover.src.match(/\.[a-z0-9]+(?=$|\?)/i)?.[0];
  const version = cover.src.match(/\.([a-f0-9]+)\.[a-z0-9]+(?=$|\?)/i)?.[1];

  if (!extension) {
    return `${url}${cover.src}`;
  }

  const versionQuery = version ? `?v=${version}` : '';

  return `${assetPrefix}/og/${encodeURIComponent(slug)}${extension}${versionQuery}`;
};

export function Metadata(
  props: (BaseMetadata | PostMetadata | RenderedPostMetadata) & AdditionalProps,
) {
  const {
    title = '',
    abstract = '',
    keyword,
    slug,
    cover,
    publishTime = '',
    updateTime,
    isPage = false,
    ignore = false,
  } = props;
  const isPost = isPostMetadata(props);
  const coverUrl = cover ? getCoverUrl(cover, slug) : undefined;
  let link = slug
    ? isPost && !isPage
      ? `${url}/post/${slug}/`
      : `${url}/${slug}/`
    : url!;

  if (!link.endsWith('/')) {
    link = link + '/';
  }

  const tags = isPost ? [...new Set([keyword, ...props.tags])] : [keyword];
  const prevNext =
    isPost && 'prevNext' in props
      ? { ...props.prevNext }
      : { ...props.customPrevNext };

  if (isPost && prevNext.next && !prevNext.next.startsWith('post/')) {
    prevNext.next = 'post/' + prevNext.next;
  }

  if (isPost && prevNext.previous && !prevNext.previous.startsWith('post/')) {
    prevNext.previous = 'post/' + prevNext.previous;
  }

  return (
    <>
      <NextSeo
        title={title}
        description={abstract}
        canonical={link}
        openGraph={{
          title,
          description: abstract,
          url: link,
          site_name: 'świstak.codes',
          type: isPage ? 'website' : 'article',
          article: isPage
            ? undefined
            : {
                publishedTime: publishTime,
                modifiedTime: updateTime,
                tags,
              },
          images: coverUrl
            ? [
                {
                  url: coverUrl,
                  height: cover.height,
                  width: cover.width,
                },
              ]
            : [
                {
                  url: `${url}${logo.src}`,
                  height: logo.height,
                  width: logo.width,
                },
              ],
        }}
        additionalLinkTags={[
          prevNext &&
            prevNext.next && {
              rel: 'next',
              href: `${url}/${prevNext.next}`,
            },
          prevNext &&
            prevNext.previous && {
              rel: 'prev',
              href: `${url}/${prevNext.previous}`,
            },
        ].filter((x) => !!x)}
        noindex={ignore}
        nofollow={ignore}
      />
      {isPost ? (
        <ArticleJsonLd
          title={title}
          description={abstract}
          url={link}
          authorName="Tomasz Świstak"
          datePublished={publishTime}
          type="Blog"
          dateModified={updateTime}
          publisherName="Tomasz Świstak"
          images={coverUrl ? [coverUrl] : [`${url}${logo.src}`]}
          publisherLogo={`${url}${logo.src}`}
        />
      ) : null}
    </>
  );
}
