export function get(obj: { [key: string]: unknown }, key: string): unknown {
  const pathArray = key.split('.');
  return pathArray.reduce((currentObj, path) => currentObj[path] as { [key: string]: unknown }, obj);
}
