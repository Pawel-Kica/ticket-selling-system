const pureOmit = (obj: any, propertiesToOmit: string[]) =>
  Object.keys(obj)
    .filter((k) => !propertiesToOmit.includes(k))
    .reduce((acc: any, key: string) => ((acc[key] = obj[key]), acc), {});

export default pureOmit;
