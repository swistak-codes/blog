import * as cheerio from 'cheerio';
import * as fs from 'fs';
import { parse } from 'date-fns';
import { pl } from 'date-fns/locale';

const baseUrl = 'http://localhost:4200';

// Parse the articles argument if present
let specificArticles = [];
const articlesArg = process.argv.find((arg) => arg.startsWith('--articles='));
if (articlesArg) {
  specificArticles = articlesArg
    .replace('--articles=', '')
    .split(',')
    .map((slug) => slug.trim());
  console.log('Selective scrape mode - articles:', specificArticles);
}

function truncateStringToWords(str, limit) {
  if (str.length <= limit) {
    return str;
  }
  let truncatedString = str.slice(0, limit);
  let lastSpaceIndex = truncatedString.lastIndexOf(' ');
  if (lastSpaceIndex === -1) {
    return truncatedString;
  }
  return truncatedString.slice(0, lastSpaceIndex);
}

async function getArticleUrls(url, specificSlugs = []) {
  try {
    console.log('Fetching article list');
    const response = await fetch(`${url}/spis-artykulow/`);
    const text = await response.text();
    console.log('Parsing list');
    const $ = cheerio.load(text);

    let urls = $('article a')
      .get()
      .map((x) => `${url}${$(x).attr('href')}`);

    // Filter URLs by specific slugs if provided
    if (specificSlugs.length > 0) {
      urls = urls.filter((urlStr) => {
        const slug = urlStr.split('/').at(urlStr.endsWith('/') ? -2 : -1);
        return specificSlugs.includes(slug);
      });
      console.log(`Filtered to ${urls.length} specific articles`);
    }

    return urls;
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return [];
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrapePost(url, retries = 10) {
  try {
    console.log('Started scraping', url);
    const response = await fetch(url);
    const text = await response.text();
    const $ = cheerio.load(text);
    const date = +parse(
      $('div[data-testid="post-date"]').text().split(',').at(-1).trim(),
      'do MMMM yyyy',
      new Date(),
      { locale: pl },
    );
    $('figure > span').remove();
    $('iframe').remove();
    $('.toc').remove();
    $('div[data-testid="post-date"]').remove();
    $('article small').last().remove();
    const abstract = $('meta[name="description"]').prop('content').trim();
    const image = $('meta[property="og:image"]')
      .prop('content')
      .trim()
      .replace(baseUrl, '');
    const slug = url.split('/').at(url.endsWith('/') ? -2 : -1);
    const title = $('article h1').text().trim();
    const tags = $('.ph.ph-hash')
      .get()
      .map((x) => $(x).next().text().trim());
    const categories = [
      ...new Set(
        $('.ph.ph-tag')
          .get()
          .map((x) => $(x).next().text().trim()),
      ).values(),
    ];
    const content = $('[data-testid=post-content]').text().trim();
    $('.math').remove();
    const contentEmbedding = truncateStringToWords(
      $('[data-testid=post-content]')
        .text()
        .trim()
        .replace(
          /(http|ftp|https):\/\/([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?/g,
          '',
        )
        .replace(/[^A-Za-z0-9\sĄąĘęÓóŚśŻżŹźĆćŁł]/g, '')
        .toLowerCase()
        .replace(/\s+/gm, ' '),
      20000,
    );
    console.log('Scraped', title);
    return {
      title,
      id: slug,
      type: url.includes('/offtopic/') ? 'offtopic' : 'blog',
      tags,
      categories,
      date,
      abstract,
      content,
      contentEmbedding,
      image,
    };
  } catch (error) {
    if (
      error.name === 'TypeError' &&
      error.message.includes('fetch failed') &&
      retries > 0
    ) {
      console.error(
        `Error scraping post: ${error.message}. Retrying in 5 seconds... (${retries} retries left)`,
      );
      await delay(5000);
      return scrapePost(url, retries - 1);
    } else {
      console.error('Error scraping post:', error);
      return null;
    }
  }
}

async function scrapeContents(urls) {
  const posts = [];
  for (let url of urls) {
    const postContent = await scrapePost(url);
    if (postContent) {
      posts.push(postContent);
    }
  }
  return posts;
}

async function readExistingPosts() {
  if (!fs.existsSync('blog-contents.jsonl')) {
    return [];
  }

  const content = fs.readFileSync('blog-contents.jsonl', 'utf-8');
  const posts = content
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));

  return posts;
}

async function scrapeAll() {
  const urls = await getArticleUrls(baseUrl, specificArticles);
  console.log('Got urls:', urls.length);

  if (urls.length === 0) {
    console.log('No matching articles found to scrape');
    return;
  }

  const scrapedPosts = await scrapeContents(urls);

  if (specificArticles.length > 0) {
    // Selective update mode - only update the specified articles
    const existingPosts = await readExistingPosts();

    // Map posts by ID (slug) for easier lookup
    const scrapedPostsMap = new Map(
      scrapedPosts.map((post) => [post.id, post]),
    );

    // Create a new array with updated posts
    const updatedPosts = existingPosts.map((post) => {
      if (scrapedPostsMap.has(post.id)) {
        console.log(`Updating existing post: ${post.id}`);
        return scrapedPostsMap.get(post.id);
      }
      return post;
    });

    // Check if any scraped posts weren't in the existing file (new posts)
    scrapedPosts.forEach((post) => {
      if (!existingPosts.some((p) => p.id === post.id)) {
        console.log(`Adding new post: ${post.id}`);
        updatedPosts.push(post);
      }
    });

    // Write the updated posts to the file
    const writeStream = fs.createWriteStream('blog-contents.jsonl', {
      flags: 'w',
    });
    updatedPosts.forEach((obj) => {
      writeStream.write(JSON.stringify(obj) + '\n');
    });
    writeStream.end(() => {
      console.log('JSONL updated with selected articles');
    });
  } else {
    // Full scrape mode - replace the entire file
    const writeStream = fs.createWriteStream('blog-contents.jsonl', {
      flags: 'w',
    });
    scrapedPosts.forEach((obj) => {
      writeStream.write(JSON.stringify(obj) + '\n');
    });
    writeStream.end(() => {
      console.log('JSONL created');
    });
  }
}

scrapeAll();
