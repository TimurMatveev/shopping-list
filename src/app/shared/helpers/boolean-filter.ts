export function booleanFilter<T>(value: T | null | undefined): value is T {
  return Boolean(value);
}
