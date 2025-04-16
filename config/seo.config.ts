import { DefaultSeoProps } from 'next-seo/lib/types';

export const seoConfig: DefaultSeoProps = {
  titleTemplate: '%s — świstak.codes',
  defaultTitle:
    'świstak.codes — O programowaniu, informatyce i matematyce przystępnym językiem',
  facebook: {
    appId: '966242223397117',
  },
  openGraph: {
    locale: 'pl_PL',
    profile: {
      firstName: 'Tomasz',
      lastName: 'Świstak',
      username: 'tswistak',
    },
    type: 'article',
    article: {
      authors: ['Tomasz Świstak'],
    },
  },
  defaultOpenGraphImageHeight: 1200,
  defaultOpenGraphImageWidth: 675,
  additionalMetaTags: [
    {
      name: 'google-site-verification',
      content: 'V7AGRnUuciGMBwuPTzVBNvwl9oCrQpRg9dmAo5pZlbQ',
    },
  ],
  robotsProps: {
    maxImagePreview: 'large',
    maxVideoPreview: -1,
    maxSnippet: -1,
  },
};
