/**
 * Function to round numbers to only 2 decimals
 * @param value
 *
 * @return value either untouched or cut to two significant digits
 */
export function roundDictValues(value: string | number): number | string {
  if (typeof value === 'number') {
    return parseFloat(value.toFixed(2));
  } else {
    return value
  }
}

export function objectKeys(obj: any): string[] {
  return Object.keys(obj);
}
