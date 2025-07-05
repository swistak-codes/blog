import type { MDXComponents } from 'mdx/types';
import CustomLink from './components/post/mdx-components/custom-link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: CustomLink,
  };
}
