const path = require('path');
const generatePages = require('./generate-pages');

const postsPath = path.join(process.cwd(), 'src/_posts/content');
const postsOutputDir = path.join(process.cwd(), 'src/pages/post/');
const postTemplatePath = path.join(__dirname, 'template.tsx');

generatePages(postsPath, postsOutputDir, postTemplatePath);
