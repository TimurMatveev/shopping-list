import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE } from "../../../providers/local-storage/local-storage.provider";
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import { LoginData, SignUpData, AuthData } from "../auth.types";
import { AUTH_EXPIRATION_INTERVAL } from "../auth.provider";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { User, UserService } from "../../../../modules/users";

const AUTH_STORAGE_KEY = 'auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly isLoaded$: Observable<boolean> = this.isLoading$
    .pipe(
      filter((isLoading: boolean) => !isLoading),
    );

  public readonly user$: Observable<User | null> = this.getSavedUser$()
    .pipe(
      switchMap((user: User | null) => this.updateUser.pipe(startWith(user))),
      distinctUntilChanged(),
      shareReplay(1),
      map((user: User | null) => (!user || this.isAuthExpired()) ? null : user),
      tap((user: User | null) => {
        if (!user) {
          this.logout();
        }
      }),
    );

  public readonly userId$: Observable<User['id'] | null> = this.user$
    .pipe(
      map((user: User | null) => user && user.id),
    );

  private updateUser: Subject<User | null> = new Subject<User | null>();

  constructor(
    private userService: UserService,
    private router: Router,
    private translateService: TranslateService,
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    @Inject(AUTH_EXPIRATION_INTERVAL) private expirationInterval: number,
  ) {
  }

  public isAuthExpired(authData: AuthData | null = this.savedAuthData): boolean {
    if (!authData) {
      return true;
    }

    if (authData.keepLoggedIn) {
      return false;
    }

    return Date.now() - authData.loginAt > this.expirationInterval;
  }

  public signUp({ keepLoggedIn, ...user }: SignUpData): Observable<User> {
    return this.userService.create(user).pipe(
      tap((user: User) => this.setAuthUser(user, keepLoggedIn)),
    );
  }

  public login({ keepLoggedIn, password, email }: LoginData): Observable<User> {
    return this.userService.getByAuth(email, password)
      .pipe(
        tap((user: User) => this.setAuthUser(user, keepLoggedIn)),
      );
  }

  public logout(): void {
    this.savedAuthData = null;
    this.updateUser.next(null);
    this.router.navigate(['auth']);
  }

  private get savedAuthData(): AuthData | null {
    const authDataString = this.localStorage.getItem(AUTH_STORAGE_KEY);
    return authDataString && JSON.parse(authDataString);
  }

  private set savedAuthData(authData: AuthData | null) {
    if (authData) {
      this.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    } else {
      this.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }

  private setAuthUser(user: User, keepLoggedIn: boolean): void {
    this.savedAuthData = {
      id: user.id,
      keepLoggedIn,
      loginAt: Date.now(),
    };

    this.updateUser.next(user);
  }

  private getSavedUser$(): Observable<User | null> {
    const authDataString = this.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!authDataString) {
      return of(null);
    }

    const authData: AuthData = JSON.parse(authDataString);

    if (this.isAuthExpired(authData)) {
      return of(null);
    }

    this.isLoading$.next(true);

    return this.userService.getItem(authData.id)
      .pipe(
        finalize(() => this.isLoading$.next(false)),
        catchError(() => of(null)),
      );
  }
}
