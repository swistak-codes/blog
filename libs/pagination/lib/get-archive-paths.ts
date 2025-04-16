import * as _ from 'lodash/fp';
import { Post } from '@swistak-codes/types';

export const getArchivePaths = (archive: Record<string, Post[][]>) =>
  _.flowRight(
    _.flatMap(([date, posts]) => {
      const [year, month] = date.split('-');

      return _.flowRight(
        _.times((x) =>
          x > 0
            ? {
                params: { archive: [year, month, 'page', `${x + 1}`] },
              }
            : {
                params: { archive: [year, month] },
              }
        ),
        _.size
      )(posts);
    }),
    _.entries
  )(archive);
