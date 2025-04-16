import * as _ from 'lodash/fp';
import { Post } from '@swistak-codes/types';

type Path = { params: { entry: string } };

export const getPostsPaths = (allPosts: Post[]) =>
  _.map<Post, Path>((x) => ({
    params: { entry: x.meta.slug },
  }))(allPosts);
