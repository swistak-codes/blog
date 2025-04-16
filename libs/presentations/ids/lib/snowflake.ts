const EPOCH = 1288834974657;
let sequence = 0;

export function snowflake(machineId: number) {
  sequence = (sequence + 1) % 4096;
  const timestamp = BigInt(Date.now() - EPOCH);
  return (
    (timestamp << BigInt(22)) |
    (BigInt(machineId) << BigInt(12)) |
    BigInt(sequence)
  );
}
