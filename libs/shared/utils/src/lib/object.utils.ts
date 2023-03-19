export const omit = <T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: readonly K[]
): Omit<T, K> => {
  const tempObject = { ...object };

  keys.forEach((key) => {
    delete tempObject[key];
  });

  return tempObject;
};
