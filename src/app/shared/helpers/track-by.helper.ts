import { TrackByFunction } from "@angular/core";

export function trackByField<T>(key: keyof T): TrackByFunction<T> {
  return (index: number, item: T) => item[key];
}

export const trackById: TrackByFunction<{ id: number }> = trackByField<{ id: number }>('id');

export const trackByKey: TrackByFunction<{ key: string | number }> = trackByField<{ key: string | number }>('key');

export const trackBySelf: TrackByFunction<unknown> = (index: number, item: unknown) => item;

export const trackByIndex: TrackByFunction<unknown> = (index: number) => index;

// export const isPalindrome = (str: string) => str === [...str].reverse().join('');
//
// export const isPalindrome2 = (str: string) => {
//   for (let i = 0; i < str.length / 2; i++) {
//     if (str.at(i) !== str.at(-i - 1)) {
//       return false;
//     }
//   }
//
//   return true;
// };
//
// console.log(isPalindrome('asddsa'));

// const a = [
//   [1, 2, 3],
//   [1, 2, 3],
//   [1, 2, 3],
// ];
//
// const last = a[a.length - 1][a[a.length - 1].length - 1];
//
// const last2 = a.at(-1)!.at(-1)!;
