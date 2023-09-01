import { InjectionToken } from "@angular/core";

export const AUTH_EXPIRATION_INTERVAL: InjectionToken<number> =
  new InjectionToken<number>('AUTH_EXPIRATION_INTERVAL', {
    providedIn: 'root',
    factory: () => 60 * 60 * 1000, // one hour
  });
