import { Post } from '@swistak-codes/types';
import { startOfTomorrow } from 'date-fns';

export const posts: Post[] = [
  {
    Component: {} as never,
    meta: {
      tags: ['first', 'second'],
      categories: ['first-category', 'second-category'],
      publishTime: '2022-03-20T15:00:00.000Z',
      updateTime: '2022-03-20T15:00:00.000Z',
      firstParagraph: {} as never,
      slug: 'first-post',
      abstract: 'bla bla bla',
      cover: {} as never,
      keyword: '',
      title: '',
    },
  },
  {
    Component: {} as never,
    meta: {
      tags: ['third', 'second'],
      categories: ['first-category'],
      publishTime: '2022-03-19T15:00:00.000Z',
      updateTime: '2022-03-20T15:00:00.000Z',
      firstParagraph: {} as never,
      slug: 'second-post',
      abstract: 'blah blah blah',
      cover: {} as never,
      keyword: '',
      title: '',
    },
  },
  {
    Component: {} as never,
    meta: {
      tags: ['first', 'second', 'third'],
      categories: ['second-category'],
      publishTime: '2021-03-20T15:00:00.000Z',
      updateTime: '2022-03-20T15:00:00.000Z',
      firstParagraph: {} as never,
      slug: 'third-post',
      abstract: 'blah bla',
      cover: {} as never,
      keyword: '',
      title: '',
    },
  },
  {
    Component: {} as never,
    meta: {
      tags: ['first'],
      categories: ['second-category'],
      publishTime: '2020-03-10T15:00:00.000Z',
      updateTime: '2022-03-20T15:00:00.000Z',
      firstParagraph: {} as never,
      slug: 'fourth-post',
      abstract: 'blah blah',
      cover: {} as never,
      keyword: '',
      title: '',
    },
  },
  {
    Component: {} as never,
    meta: {
      tags: ['first'],
      categories: ['third-category'],
      publishTime: '2020-03-20T15:00:00.000Z',
      updateTime: '2022-03-20T15:00:00.000Z',
      firstParagraph: {} as never,
      slug: 'fifth-post',
      abstract: 'bla bla',
      cover: {} as never,
      keyword: '',
      title: '',
    },
  },
];

export const getPostWithFutureDate = () => ({
  Component: {} as never,
  meta: {
    tags: ['future'],
    categories: ['third-category'],
    publishTime: startOfTomorrow().toISOString(),
    updateTime: startOfTomorrow().toISOString(),
    firstParagraph: {} as never,
    slug: 'future-post',
    abstract: 'bla bla FUTURE',
    cover: {} as never,
    keyword: '',
    title: '',
  },
});
