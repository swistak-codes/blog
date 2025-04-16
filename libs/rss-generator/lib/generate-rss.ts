import { Post } from '@swistak-codes/types';
import { Feed } from 'feed';
import { compareDesc } from 'date-fns';
import * as fs from 'fs/promises';
import { generateContent } from './generate-content';
import { v4 } from 'uuid';

const publicPath = './public';

export const generateRss = async (
  feedName: string,
  feedPath: string,
  posts: Post[],
) => {
  const sortedPosts = posts.sort((a, b) =>
    compareDesc(new Date(a.meta.publishTime), new Date(b.meta.publishTime)),
  );
  const url = 'https://swistak.codes';
  const currentDate = new Date(sortedPosts[0].meta.publishTime);
  const author = {
    name: 'Tomasz Świstak',
    email: 'tomasz@swistak.codes',
    link: 'https://swistak.codes',
  };

  const rssDir = `/rss-${feedPath}`;
  const basePaths = {
    rss2: `${rssDir}/feed.xml`,
    json: `${rssDir}/feed.json`,
    atom: `${rssDir}/atom.xml`,
  };
  const paths = {
    rss2: `${url}${basePaths.rss2}`,
    json: `${url}${basePaths.json}`,
    atom: `${url}${basePaths.atom}`,
  };

  const feed = new Feed({
    title: `świstak.codes — ${feedName}`,
    description: '',
    id: url,
    link: url,
    copyright: `Wszystkie prawa zastrzeżone 2020-${currentDate.getFullYear()}, Tomasz Świstak`,
    updated: currentDate,
    image: `${url}/fav270.png`,
    favicon: `${url}/fav32.png`,
    feedLinks: paths,
    author,
  });

  sortedPosts.forEach((post) => {
    const typeSlug = post.meta.isOfftopic ? 'offtopic' : 'post';
    const postUrl = `${url}/${typeSlug}/${post.meta.slug}`;

    feed.addItem({
      title: post.meta.title,
      id: postUrl,
      link: postUrl,
      description: post.meta.abstract,
      content: generateContent(
        post.meta.firstParagraph,
        post.Component,
        postUrl,
      ),
      author: [author],
      contributor: [author],
      date: new Date(post.meta.publishTime),
    });
  });

  const random = v4();

  await fs.mkdir(`${publicPath}${rssDir}`, { recursive: true });
  await Promise.all([
    fs.writeFile(`${publicPath}${basePaths.rss2}.${random}`, feed.rss2()),
    fs.writeFile(`${publicPath}${basePaths.json}.${random}`, feed.json1()),
    fs.writeFile(`${publicPath}${basePaths.atom}.${random}`, feed.atom1()),
  ]);
  await Promise.all([
    fs.rename(
      `${publicPath}${basePaths.atom}.${random}`,
      `${publicPath}${basePaths.atom}`,
    ),
    fs.rename(
      `${publicPath}${basePaths.json}.${random}`,
      `${publicPath}${basePaths.json}`,
    ),
    fs.rename(
      `${publicPath}${basePaths.rss2}.${random}`,
      `${publicPath}${basePaths.rss2}`,
    ),
  ]);

  return paths;
};
