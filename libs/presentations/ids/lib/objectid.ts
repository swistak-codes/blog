let counter: number | null = null;

function objectIdBytes(processId: Uint8Array) {
  const result = new Uint8Array(12);
  const timestamp = Math.trunc(Date.now() / 1000);
  result[0] = (timestamp >> 24) & 0xff;
  result[1] = (timestamp >> 16) & 0xff;
  result[2] = (timestamp >> 8) & 0xff;
  result[3] = timestamp & 0xff;
  result[4] = processId[0];
  result[5] = processId[1];
  result[6] = processId[2];
  result[7] = processId[3];
  result[8] = processId[4];
  if (!counter) {
    counter = Math.trunc(Math.random() * 0xffffff);
  }
  counter = (counter + 1) % 0xffffff;
  result[9] = (counter >> 16) & 0xff;
  result[10] = (counter >> 8) & 0xff;
  result[11] = counter & 0xff;
  return result;
}

function objectIdToString(id: Uint8Array) {
  let hexString = '';
  for (let i = 0; i < id.length; i++) {
    const byte = id[i];
    const hex = byte.toString(16).padStart(2, '0');
    hexString += hex;
  }
  return hexString;
}

export function objectId(processId: Uint8Array) {
  return objectIdToString(objectIdBytes(processId));
}
