import { getPageNumbersToDisplay } from './get-page-numbers-to-display';

describe('get-page-numbers-to-display', () => {
  it('should return empty array if there is no page division', () => {
    const result = getPageNumbersToDisplay(1, 1);
    expect(result).toHaveLength(0);
  });

  it.each`
    page | count | expected
    ${1} | ${2}  | ${[1, 2]}
    ${1} | ${3}  | ${[1, 2, 3]}
    ${1} | ${4}  | ${[1, 2, null, 4]}
    ${1} | ${5}  | ${[1, 2, null, 5]}
    ${2} | ${5}  | ${[1, 2, 3, null, 5]}
    ${3} | ${5}  | ${[1, 2, 3, 4, 5]}
    ${4} | ${5}  | ${[1, null, 3, 4, 5]}
    ${5} | ${15} | ${[1, null, 4, 5, 6, null, 15]}
  `(
    'should split correctly into pages ($page, $count -> $expected)',
    ({ page, count, expected }) => {
      const result = getPageNumbersToDisplay(page, count);
      expect(result).toEqual(expected);
    }
  );
});
