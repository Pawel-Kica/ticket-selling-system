export function omit(obj: any, props?: string[] | string) {
  const result = { ...obj };
  if (!props) return result;
  if (typeof props === 'string') {
    delete result[props];
    return result;
  }
  props.forEach(function (prop) {
    delete result[prop];
  });
  return result;
}

export function modifyObject(spy: { [x: string]: string }, str: string) {
  const newObj = { ...spy };
  Object.keys(newObj).forEach(function (key) {
    newObj[key] = `${newObj[key]}${str}`;
  });
  return newObj;
}

export function pick(obj: { [x: string]: any }, props: string[]) {
  return props.reduce(function (result, prop) {
    result[prop] = obj[prop];
    return result;
  }, {});
}
