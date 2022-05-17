export function ToNumber(value: string): number | undefined {
  const newValue = Number(value);
  if (isNaN(newValue)) return undefined;
  return newValue;
}
