import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { AuthService } from "../../services";
import { LoginData, SignUpData } from "../../auth.types";
import { finalize, takeUntil } from "rxjs";
import { DestroyService } from "../../../../services/destroy/destroy.service";
import { Router } from "@angular/router";
import { ErrorHandlerService } from "../../../../services/error-handler/error-handler.service";

@Component({
  selector: 'sl-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DestroyService,
  ],
})
export class AuthPageComponent {
  public isSingUp: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    @Self() private destroyed$: DestroyService,
  ) {
  }

  public onLogin(loginData: LoginData): void {
    this.authService.isLoading$.next(true);

    this.authService
      .login(loginData)
      .pipe(
        finalize(() => this.authService.isLoading$.next(false)),
        takeUntil(this.destroyed$),
      )
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (error: Error) => this.errorHandlerService.handleError(error),
      });
  }

  public onSignUp(signUpData: SignUpData): void {
    this.authService.isLoading$.next(true);

    this.authService
      .signUp(signUpData)
      .pipe(
        finalize(() => this.authService.isLoading$.next(false)),
        takeUntil(this.destroyed$),
      )
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (error: Error) => this.errorHandlerService.handleError(error),
      });
  }
}
