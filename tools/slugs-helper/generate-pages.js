const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const prettier = require('prettier');

async function generatePages(postsPath, outputDir, templatePath) {
  const exportNameRegex = /export const ([\w\d]*): Post = \{/;
  const slugRegex = /slug: '([a-z\d\-]*)',/;

  const dirs = fs
    .readdirSync(postsPath, { withFileTypes: true })
    .filter((x) => x.isDirectory());

  const template = fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = _.template(template);

  for (const dir of dirs) {
    const directory = dir.name;

    const indexPath = path.join(postsPath, directory, 'index.ts');
    const index = fs.readFileSync(indexPath, 'utf-8');
    const exportName = index.match(exportNameRegex)[1];

    const articlePath = path.join(postsPath, directory, 'article.mdx');
    const article = fs.readFileSync(articlePath, 'utf-8');
    const slug = article.match(slugRegex)[1];

    if (!exportName || !slug) {
      console.error(`${dir.name}, ${slug}`);
      continue;
    }

    const newPage = compiledTemplate({ exportName, directory });
    const formatted = await prettier.format(newPage, {
      parser: 'babel-ts',
      singleQuote: true,
    });

    const filePath = path.join(outputDir, `${slug}.tsx`);
    fs.writeFileSync(filePath, formatted);
  }
}

module.exports = generatePages;
