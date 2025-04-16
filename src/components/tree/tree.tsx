import { LinkTree } from '@swistak-codes/types';
import Link from 'next/link';
import styles from './tree.module.scss';

type Props = {
  tree: LinkTree[];
  nameToCount?: Record<string, number>;
};

export const Tree = ({ tree, nameToCount = {} }: Props) => {
  return (
    <div className={styles.treeContainer}>
      <ul className={styles.list}>
        {tree.map((x) => (
          <li key={x.name}>
            {x.slug ? (
              <>
                <Link href={x.slug} scroll prefetch={false}>
                  {x.name}
                </Link>
                {nameToCount[x.name] && <>&nbsp;({nameToCount[x.name]})</>}
              </>
            ) : (
              x.name
            )}
            {x.children && x.children.length > 0 && (
              <ul className={styles.subList}>
                {x.children.map((y) => (
                  <li key={y.slug}>
                    <i className="ph ph-arrow-elbow-down-right"></i>&nbsp;
                    <Link href={y.slug} scroll prefetch={false}>
                      {y.name}
                    </Link>
                    {nameToCount[y.name] && <>&nbsp;({nameToCount[y.name]})</>}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
