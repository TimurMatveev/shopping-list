import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output, TrackByFunction,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { trackBySelf } from "../../../../shared/helpers/track-by.helper";
import { User, UserRole } from "../../model";

export type UserForm = {
  name: FormControl<string>;
  email: FormControl<string>;
  role: FormControl<UserRole>;
}

export type UserFormData = ReturnType<FormGroup<UserForm>['getRawValue']>;

@Component({
  selector: 'sl-user-form[formId]',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  @Input() public formId!: string;

  @Input() public user?: User;

  @Output() public submitted: EventEmitter<UserFormData> = new EventEmitter<UserFormData>();

  public readonly roles: UserRole[] = Object.values(UserRole);

  public readonly trackByRole: TrackByFunction<UserRole> = trackBySelf;

  public readonly userForm: FormGroup<UserForm> = new FormGroup<UserForm>({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>(
      '',
      { nonNullable: true, validators: [Validators.required, Validators.email] },
    ),
    role: new FormControl<UserRole>(UserRole.User, { nonNullable: true }),
  });

  public ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue(this.user, { emitEvent: false });
    }
  }

  public onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
    this.submitted.emit(this.userForm.getRawValue());
  }
}
