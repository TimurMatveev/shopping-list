import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginData } from "../../auth.types";

type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
  keepLoggedIn: FormControl<boolean>;
}

@Component({
  selector: 'sl-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output() public submitted: EventEmitter<LoginData> = new EventEmitter<LoginData>();

  public readonly loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    email: new FormControl<string>(
      '',
      { nonNullable: true, validators: [Validators.required, Validators.email] }
    ),
    password: new FormControl<string>(
      '',
      { nonNullable: true, validators: [Validators.required] }
    ),
    keepLoggedIn: new FormControl<boolean>(false, { nonNullable: true }),
  });

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.submitted.emit(this.loginForm.getRawValue());
  }
}
