import * as _ from 'lodash/fp';
import { Post } from '@swistak-codes/types';

export const getPagesPaths = (posts: Post[][]) =>
  _.flowRight(
    _.drop(1),
    _.times((x) => ({
      params: { page: `${x + 1}` },
    })),
    _.size
  )(posts);
