import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SignUpData } from "../../auth.types";
import { Gender } from "../../../../../modules/users";

type SignUpForm = {
  avatar: FormControl<string | null>;
  name: FormControl<string>;
  email: FormControl<string>;
  gender: FormControl<Gender>;
  password: FormControl<string>;
  keepLoggedIn: FormControl<boolean>;
}

@Component({
  selector: 'sl-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['../auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent {
  @Output() public submitted: EventEmitter<SignUpData> = new EventEmitter<SignUpData>();

  public readonly passwordMinLength: number = 6;

  public readonly nameMaxLength: number = 256;

  public readonly imageUrlMaxLength: number = 2048;

  public readonly gender: typeof Gender = Gender;

  public readonly signUpForm: FormGroup<SignUpForm> = new FormGroup<SignUpForm>({
    avatar: new FormControl<string | null>(
      null,
      { validators: [Validators.maxLength(this.imageUrlMaxLength)] },
    ),
    gender: new FormControl<Gender>(
      Gender.Unknown,
      { nonNullable: true },
    ),
    name: new FormControl<string>(
      '',
      { nonNullable: true, validators: [Validators.required, Validators.maxLength(this.nameMaxLength)] },
    ),
    email: new FormControl<string>(
      '',
      {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }
    ),
    password: new FormControl<string>(
      '',
      { nonNullable: true, validators: [Validators.required, Validators.minLength(this.passwordMinLength)] },
    ),
    keepLoggedIn: new FormControl<boolean>(
      false,
      { nonNullable: true },
    ),
  });

  public onSubmit(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    this.submitted.emit(this.signUpForm.getRawValue());
  }
}
