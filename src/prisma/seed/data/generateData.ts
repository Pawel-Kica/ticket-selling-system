function generateIdPrefixes(data: any, prefix: string) {
  const result = data.map((el: any, idx: number) => {
    return { ...el, id: `${prefix}${idx + 1}` };
  });
  return result;
}

export default generateIdPrefixes;
