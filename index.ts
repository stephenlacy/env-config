// env-config

export function Config<T>(base: any, env?: typeof process.env): T {
  // filter out env variables that don't match the config object
  const envKeys = Object.keys(process.env).filter((key) => {
    return Object.keys(base).find((baseKey) => {
      return key.startsWith(baseKey.toUpperCase());
    });
  });

  const source = env || process.env;

  const cfg = envKeys.reduce(
    (acc, key) => {
      const value = source[key] ?? "";
      const keyParts = key.toLowerCase().split("_");

      keyParts.reduce((currentPart, part, index, arr) => {
        if (index === arr.length - 1) {
          // assign value from env to the corresponding path in the config
          currentPart[part] = value;
          return currentPart; 
        } else {
          // navigate through or initialize the nested property
          currentPart[part] = currentPart[part] || {};
          return currentPart[part]; // move deeper into the object
        }
      }, acc);

      return acc; // accumulator for the outer reduce function
    },
    { ...base }
  );

  return cfg as T;
}
