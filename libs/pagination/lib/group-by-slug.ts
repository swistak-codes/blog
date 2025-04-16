import * as _ from 'lodash/fp';
import { Post } from '@swistak-codes/types';

export const groupBySlug = (posts: Post[]): Record<string, Post> =>
  _.flowRight(
    _.mapValues<Post[], Post>((x) => x[0]),
    _.groupBy<Post>((x) => x.meta.slug)
  )(posts);
