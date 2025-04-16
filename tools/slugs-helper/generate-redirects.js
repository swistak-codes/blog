const fs = require('fs');
const path = require('path');

const slugRegex = /slug: '([a-z\d\-]*)',/;

const postsPath = path.join(process.cwd(), 'src/_posts/content');
const outputPath = path.join(process.cwd(), 'config/post-redirects.json');

const dirs = fs
  .readdirSync(postsPath, { withFileTypes: true })
  .filter((x) => x.isDirectory());

const slugs = [];

for (const dir of dirs) {
  const articlePath = path.join(postsPath, dir.name, 'article.mdx');
  const article = fs.readFileSync(articlePath, 'utf-8');
  const slug = article.match(slugRegex)[1];

  if (slug) {
    slugs.push(slug);
  }
}

const redirects = slugs.map((x) => ({
  source: '/' + x,
  destination: '/post/' + x,
  permanent: true,
}));

fs.writeFileSync(outputPath, JSON.stringify(redirects));
