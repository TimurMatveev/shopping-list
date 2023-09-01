import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sl-form-actions',
  templateUrl: './form-actions.component.html',
  styleUrls: ['./form-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormActionsComponent {
  @Input() formId!: string;

  @Input() isLoading: boolean | null = null;

  @Input() valid: boolean = false;

  @Input() dirty: boolean = false;

  @Input() resetLabel: string = '';

  @Input() cancelLabel: string = '';

  @Input() submitLabel: string = '';

  @Input() canReset: boolean = true;

  @Output() cancelForm: EventEmitter<Event> = new EventEmitter<Event>();
}
