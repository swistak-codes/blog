import { Post } from '@swistak-codes/types';
// import { isPast } from 'date-fns';

export const hideUnpublished = (posts: Post[]) => {
  // TODO fix docker build
  // const hidePosts = process.env['HIDE_UNPUBLISHED'] === 'true' || false;
  //
  // if (!hidePosts) {
  //   return posts;
  // }
  //
  // return posts.filter((x) => isPast(new Date(x.meta.publishTime)));
  return posts;
};
