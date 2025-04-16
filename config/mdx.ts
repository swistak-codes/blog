import generated from '@next/mdx';
import remarkMdxImages from 'remark-mdx-images';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkPrism from 'remark-prism';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc from '@jsdevtools/rehype-toc';
import rehypeSlug from 'rehype-slug';

export const withMDX = generated({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkMdxImages,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      [
        remarkPrism,
        {
          plugins: [
            'command-line',
            'diff-highlight',
            'line-numbers',
            'treeview',
          ],
        },
      ],
      [remarkMath, { singleDollarTextMath: false }],
      remarkGfm,
      [
        remarkRehype,
        { footnoteLabel: 'Przypisy', footnoteBackLabel: 'Wróć do treści' },
      ],
    ],
    rehypePlugins: [
      [
        rehypeKatex,
        {
          output: 'htmlAndMathml',
          strict: (errorCode: string) =>
            [
              'unicodeTextInMathMode',
              'unknownSymbol',
              'newLineInDisplayMode',
            ].includes(errorCode)
              ? 'ignore'
              : 'warn',
        },
      ],
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeToc,
    ],
  },
});
