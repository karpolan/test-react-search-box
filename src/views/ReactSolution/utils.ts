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

// Todo: Use lodash or other library with full featured "debounce" function
export function debounce(fn: any, time: number) {
  let timeoutId: NodeJS.Timeout | null = null;
  return wrapper;

  function wrapper(...args: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, time);
  }
}
