const path = require('path');
const generatePages = require('./generate-pages');

const postsPath = path.join(process.cwd(), 'src/_posts/content');
const postsOutputDir = path.join(process.cwd(), 'src/pages/post/');
const postTemplatePath = path.join(__dirname, 'template.tsx');

const offtopPath = path.join(process.cwd(), 'src/_offtopic');
const offtopOutputDir = path.join(process.cwd(), 'src/pages/offtopic/');
const offtopTemplatePath = path.join(__dirname, 'offtop-template.tsx');

generatePages(postsPath, postsOutputDir, postTemplatePath);
generatePages(offtopPath, offtopOutputDir, offtopTemplatePath);
