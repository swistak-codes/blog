import type { Difference } from 'microdiff';

// funkcja aplikująca pojedynczą łatkę
export const applyPatch = <T extends object>(state: T, patch: Difference) => {
  const result = structuredClone(state);
  const key = patch.path.at(-1)!;
  const target = patch.path
    .slice(0, -1)
    .reduce(
      (object, part) => object[part] as Record<string | number, unknown>,
      result as Record<string | number, unknown>,
    );

  if (patch.type === 'REMOVE') delete target[key];
  else target[key] = structuredClone(patch.value);

  return result;
};

// funkcja tworząca odwrotną łatkę
export const reversePatch = (patch: Difference): Difference => {
  if (patch.type === 'CREATE') {
    return { type: 'REMOVE', path: patch.path, oldValue: patch.value };
  }
  if (patch.type === 'REMOVE') {
    return { type: 'CREATE', path: patch.path, value: patch.oldValue };
  }
  return {
    type: 'CHANGE',
    path: patch.path,
    oldValue: patch.value,
    value: patch.oldValue,
  };
};

// funkcja aplikująca łatki (microdiff zwraca tablicę, stąd takie uniwersalne rozwiązanie)
export const applyPatches = <T extends object>(
  state: T,
  patches: readonly Difference[],
) => patches.reduce((result, patch) => applyPatch(result, patch), state);
