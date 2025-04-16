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
    isOfftopic = false,
    ignore = false,
  } = props;
  const isPost = isPostMetadata(props);
  let link = slug
    ? isPost && !isPage
      ? isOfftopic
        ? `${url}/offtopic/${slug}`
        : `${url}/post/${slug}/`
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

  if (
    isPost &&
    !isOfftopic &&
    prevNext.next &&
    !prevNext.next.startsWith('post/')
  ) {
    prevNext.next = 'post/' + prevNext.next;
  } else if (
    isPost &&
    isOfftopic &&
    prevNext.next &&
    !prevNext.next.startsWith('offtopic/')
  ) {
    prevNext.next = 'offtopic/' + prevNext.next;
  }

  if (
    isPost &&
    !isOfftopic &&
    prevNext.previous &&
    !prevNext.previous.startsWith('post/')
  ) {
    prevNext.previous = 'post/' + prevNext.previous;
  } else if (
    isPost &&
    isOfftopic &&
    prevNext.previous &&
    !prevNext.previous.startsWith('offtopic/')
  ) {
    prevNext.previous = 'offtopic/' + prevNext.previous;
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
          images: cover
            ? [
                {
                  url: `${url}${cover.src}`,
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
          images={cover ? [`${url}${cover.src}`] : [`${url}${logo.src}`]}
          publisherLogo={`${url}${logo.src}`}
        />
      ) : null}
    </>
  );
}
