// Todo: Replace with optimized function from some popular library
export function replaceAll(str: string, find: string, replace: string): string {
  let result;
  try {
    result = str.replace(new RegExp(find, 'ig'), replace);
  } catch (error) {
    result = str; // For text with ~\./ symbols RegExp may generate the exception
  }
  return result;
}
