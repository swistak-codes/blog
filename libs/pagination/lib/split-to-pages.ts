import { sortByPublishDate } from './sort-by-publish-date';
import { PAGE_SIZE } from './consts';
import { Post } from '@swistak-codes/types';
import * as _ from 'lodash/fp';
import { hideUnpublished } from './hide-unpublished';

export const splitToPages = (posts: Post[]): Post[][] =>
  _.flowRight(_.chunk(PAGE_SIZE), sortByPublishDate, hideUnpublished)(posts);
