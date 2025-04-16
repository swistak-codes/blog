import { default as Page, meta } from '../_pages/licencje.mdx';
import { Post } from '../components/post/post';
import { GetStaticProps } from 'next';
import { License } from '../shared/types';
import allLicenses from '../shared/licenses.json';
import packageJson from '../../package.json';
import isURL from 'validator/lib/isURL';
import { LicenseTable } from '../components/licenses/license-table';
import styles from '../components/common.module.scss';

type Props = {
  licenses: License[];
};

type LicenseObj = {
  licenses: string;
  repository?: string;
  url?: string;
};

export function Licencje({ licenses }: Props) {
  return (
    <Post metadata={{ ...meta }} isPage showFooter={false}>
      <div className={styles.hideToc}>
        <Page />
        <LicenseTable licenses={licenses} />
      </div>
    </Post>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // TODO move this logic outside to make it unit-testable
  const libs = [
    ...Object.keys(packageJson.dependencies),
    ...Object.keys(packageJson.devDependencies).filter(
      (x) => !x.startsWith('@types/')
    ),
  ].sort();
  const noVersionLicenses = new Map<string, LicenseObj>(
    Object.entries(allLicenses).map(([k, v]) => [k.replace(/(@\d.*$)/, ''), v])
  );

  const licenses: License[] = [];
  for (const lib of libs) {
    const info = noVersionLicenses.get(lib);
    if (!info) {
      continue;
    }
    const url =
      (isURL(info.repository || '') ? info.repository : info.url) || '';
    licenses.push({
      name: lib,
      url,
      license: info.licenses,
    });
  }

  return {
    props: {
      licenses,
    },
  };
};

export default Licencje;
