import * as _ from 'lodash/fp';

const categoryExceptions = new Map([
  ['Świat rzeczywisty a IT', 'swiat-rzeczywisty-it'],
]);

const tagExceptions = new Map([
  ['c', 'c-3'],
  ['c#', 'c-2'],
  ['c++', 'c'],
  ['f#', 'f'],
]);

const getNormalSlug = (name: string) =>
  _.flowRight(_.replace(/\s/, '-'), _.toLower, _.deburr)(name);

const getSlugsMapping = (names: string[], exceptions: Map<string, string>) => {
  const result = new Map<string, string>();

  for (const name of names) {
    if (exceptions.has(name)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      result.set(name, exceptions.get(name)!);
    } else {
      result.set(name, getNormalSlug(name));
    }
  }
  return result;
};

export const getTagNameToTagSlugMapping = (tags: string[]) =>
  getSlugsMapping(tags, tagExceptions);
export const getCategoryNameToCategorySlugMapping = (categories: string[]) =>
  getSlugsMapping(categories, categoryExceptions);
