import { PostMetadata } from './metadata';
import { MDXProps } from 'mdx/types';

export type Post = {
  Component: (props: MDXProps) => JSX.Element;
  meta: PostMetadata;
};
