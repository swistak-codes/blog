import { JSDOM } from 'jsdom';

export const removeHtmlTags = (html: string) => {
  const dom = new JSDOM(`<div id="content">${html}</div>`);
  return dom.window.document.getElementById('content')?.textContent || '';
};
