import { License } from '../../shared/types';

type Props = {
  licenses: License[];
};

export const LicenseTable = ({ licenses }: Props) => {
  return (
    <table>
      <thead>
        <td>Biblioteka</td>
        <td>Licencja</td>
        <td>URL</td>
      </thead>
      {licenses.map((lib) => (
        <tr key={lib.name}>
          <td>{lib.name}</td>
          <td>{lib.license}</td>
          <td>
            <a href={lib.url} rel="nofollow external">
              {lib.url}
            </a>
          </td>
        </tr>
      ))}
    </table>
  );
};
