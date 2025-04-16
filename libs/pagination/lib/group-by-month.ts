import * as _ from 'lodash/fp';
import { Post } from '@swistak-codes/types';
import { splitToPages } from './split-to-pages';
import { format } from 'date-fns';

export const groupByMonth = (posts: Post[]): Record<string, Post[][]> =>
  _.flowRight(
    _.mapValues<Post[], Post[][]>(splitToPages),
    _.groupBy<Post>((x) => format(new Date(x.meta.publishTime), 'yyyy-MM'))
  )(posts);
