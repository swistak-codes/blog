import { groupBySlug } from '@swistak-codes/pagination';
import * as posts from '../../_posts/content/all-posts';

const allPosts = Object.values(posts);

export const postsBySlug = groupBySlug(allPosts);
