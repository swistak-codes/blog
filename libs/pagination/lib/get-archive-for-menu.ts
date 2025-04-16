import { Archive, GroupedArchive, LinkTree, Post } from '@swistak-codes/types';
import * as _ from 'lodash/fp';
import { pl } from 'date-fns/locale';

export const getArchiveForMenu = (
  archive: Record<string, Post[][]>
): GroupedArchive =>
  _.flowRight(
    _.groupBy<Archive>('year'),
    _.map<string, Archive>((x) => {
      const [year, month] = x.split('-');
      const monthNum = parseInt(month);

      return {
        year: year,
        month: monthNum,
        slug: `/archive/${year}/${month}`,
        monthName: pl.localize?.month(monthNum - 1) || '',
      };
    }),
    _.keys
  )(archive);

export const archiveToLinkTree = (groupedArchive: GroupedArchive): LinkTree[] =>
  _.flowRight(
    _.map<[string, Archive[]], LinkTree>(([year, months]) => ({
      name: year,
      children: _.map<Archive, LinkTree>((x) => ({
        name: x.monthName,
        slug: x.slug,
        children: [],
      }))(months),
    })),
    (x: [string, Archive[]][]) => x.sort((a, b) => b[0].localeCompare(a[0])),
    _.entries
  )(groupedArchive);

export const archivePostCount = (archive: Record<string, Post[][]>) => {
  const result: Record<string, number> = {};

  return result;
};
