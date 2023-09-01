export function groupBy<T, K>(
  list: T[],
  getKey: (item: T, index: number, items: T[]) => K,
): Map<K, T[]> {
  return list.reduce((map, item, index, items) => {
    const key: K = getKey(item, index, items);
    return map.set(key, [...(map.get(key) || []), item]);
  }, new Map<K, T[]>());
}
