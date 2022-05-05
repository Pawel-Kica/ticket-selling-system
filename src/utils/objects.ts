export function omit(obj: any, props: string[] | string) {
  const result = { ...obj };
  if (typeof props === 'string') {
    delete result[props];
    return result;
  }
  props.forEach(function (prop) {
    delete result[prop];
  });
  return result;
}

export function addToObject(spy: { [x: string]: string }, str: string) {
  const newObj = { ...spy };
  Object.keys(newObj).forEach(function (key) {
    newObj[key] = `${newObj[key]}${str}`;
  });
  return newObj;
}
