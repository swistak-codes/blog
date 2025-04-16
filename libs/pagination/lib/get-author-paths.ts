import * as _ from 'lodash/fp';
import { Post } from '@swistak-codes/types';

export const getAuthorPaths = (author: string, posts: Post[][]) =>
  _.flowRight(
    _.times((x) =>
      x > 0
        ? {
            params: { author: [author, 'page', `${x + 1}`] },
          }
        : {
            params: { author: [author] },
          }
    ),
    _.size
  )(posts);
