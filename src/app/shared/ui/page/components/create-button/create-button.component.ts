import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sl-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateButtonComponent {
  @Input() public icon: string = 'add';

  @Output() create: EventEmitter<Event> = new EventEmitter<Event>();
}
