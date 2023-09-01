import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, CanLoad, Router } from "@angular/router";
import { AuthService } from "../services";
import { map, NEVER, Observable, switchMap, tap } from "rxjs";
import { User } from "../../../../modules/users";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  public canLoad(): Observable<boolean> {
    return this.checkUserLoggedIn();
  }

  public canActivate(): Observable<boolean> {
    return this.checkUserLoggedIn();
  }

  public canActivateChild(): Observable<boolean> {
    return this.checkUserLoggedIn();
  }

  private checkUserLoggedIn(): Observable<boolean> {
    return this.authService.isLoading$
      .pipe(
        switchMap((isAuthLoading: boolean) => isAuthLoading ? NEVER : this.authService.user$),
        map((user: User | null) => !!user),
        tap((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.router.navigate(['auth']);
          }
        }),
      );
  }
}
