import { ChangeEvent, Fragment, useCallback, useState } from 'react';
import Link from 'next/link';
import { groupByLetter } from '../../shared/logic/group-by-letter';
import styles from './tag-explorer.module.scss';

type Props = {
  tagsToSlugs: [string, string][];
  tagCount: Record<string, number>;
};

export const TagExplorer = ({ tagsToSlugs, tagCount }: Props) => {
  const [filteredList, setFilteredList] = useState(groupByLetter(tagsToSlugs));

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFilteredList(
        groupByLetter(
          tagsToSlugs.filter((x) =>
            x[0].toLowerCase().includes(e.target.value.toLowerCase()),
          ),
        ),
      );
    },
    [tagsToSlugs, setFilteredList],
  );

  return (
    <div className={styles.tagExplorerContainer}>
      <div className={styles.searchContainer}>
        <i className="ph ph-magnifying-glass" />
        <input type="search" onChange={handleChange} />
      </div>
      {filteredList.map(([letter, tags]) => (
        <Fragment key={letter}>
          <h2>{letter}</h2>
          <ul className={styles.list}>
            {tags.map(([name, slug]) => (
              <li key={slug}>
                <Link href={`/tag/${slug}`} scroll prefetch={false}>
                  {name}
                </Link>
                &nbsp;({tagCount[name]})
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  );
};
