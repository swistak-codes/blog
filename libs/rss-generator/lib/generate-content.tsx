import { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { removeHtmlTags } from './remove-html-tags';

const truncate = (str: string, max: number) => {
  const array = str.trim().split(' ');
  const ellipsis = array.length > max ? '...' : '';

  return array.slice(0, max).join(' ') + ellipsis;
};

export const generateContent = (
  firstParagraph: ReactElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Content: (props: any) => JSX.Element,
  url: string
) => {
  const fullContent = (
    <>
      {firstParagraph}
      {/*<br />*/}
      {/*<Content />*/}
    </>
  );

  const rendered = renderToStaticMarkup(fullContent);
  const noHtml = removeHtmlTags(rendered);
  // const truncated = truncate(noHtml, 500);
  const withLink = `${noHtml}<br /><a href="${url}">Czytaj więcej na świstak.codes</a>`;

  return withLink;
};
