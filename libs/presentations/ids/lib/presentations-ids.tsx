import { useState } from 'react';
import { nanoid } from 'nanoid';
import { v1, v4, v6, v7 } from 'uuid';
import { snowflake } from './snowflake';
import { objectId } from './objectid';
import { createId as cuid2 } from '@paralleldrive/cuid2';
import { Xid } from 'xid-ts';
import * as short from 'short-uuid';
import pushid from 'pushid';
import KSUID from 'ksuid';
import { ulid } from 'ulid';

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

const NODE_ID = new Uint8Array([106, 112, 50, 103, 109, 100]);
const MACHINE_ID = 666;
const PROCESS_ID = new Uint8Array([2, 1, 3, 7, 0xff]);

const generateId = (algorithm: Props['algorithm']) => {
  switch (algorithm) {
    case 'v4':
      return v4();
    case 'v7':
      return v7();
    case 'v16':
      return `v1: ${v1({ node: NODE_ID })}\nv6: ${v6({ node: NODE_ID })}`;
    case 'snowflake':
      return snowflake(MACHINE_ID).toString();
    case 'objectid':
      return objectId(PROCESS_ID);
    case 'nanoid':
      return nanoid();
    case 'cuid2':
      return cuid2();
    case 'xid':
      return new Xid().toString();
    case 'shortuuid':
      return short.generate();
    case 'pushid':
      return pushid();
    case 'ksuid':
      return KSUID.randomSync().string;
    case 'ulid':
      return ulid();
    default:
      throw new Error(`Nieznany algorytm ${algorithm}`);
  }
};

export const PresentationIds = ({ algorithm }: Props) => {
  const [currentId, setCurrentId] = useState(generateId(algorithm));

  return (
    <p
      style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
      }}
    >
      <pre>{currentId}</pre>
      <button
        style={{ all: 'unset', cursor: 'pointer' }}
        onClick={() => setCurrentId(generateId(algorithm))}
      >
        <i className="ph ph-arrows-clockwise"></i>
      </button>
    </p>
  );
};
