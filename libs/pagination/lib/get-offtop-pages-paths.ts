import * as _ from 'lodash/fp';
import { Post } from '@swistak-codes/types';

export const getOfftopPagesPaths = (posts: Post[][]) =>
  _.flowRight(
    _.concat([{ params: { page: [] } }]),
    _.drop(1),
    _.times((x) => ({
      params: { page: ['page', `${x + 1}`] },
    })),
    _.size
  )(posts);
