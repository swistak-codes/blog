import dynamic from 'next/dynamic';

type Props = {
  algorithm:
    | 'v4'
    | 'v7'
    | 'v16'
    | 'snowflake'
    | 'objectid'
    | 'nanoid'
    | 'cuid2'
    | 'xid'
    | 'shortuuid'
    | 'pushid'
    | 'ksuid'
    | 'ulid';
};

const Ids = dynamic(() => import('@swistak-codes/presentations/ids'), {
  ssr: false,
});

export const Presentation = ({ algorithm }: Props) => {
  return <Ids algorithm={algorithm} />;
};
