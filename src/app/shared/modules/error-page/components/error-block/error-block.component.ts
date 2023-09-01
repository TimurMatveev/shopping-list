import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sl-error-block',
  templateUrl: './error-block.component.html',
  styleUrls: ['./error-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorBlockComponent {
  @Input() public errorImageUrl: string = '';

  @Input() public errorMessage: string = '';

  @Output() public navigateBack: EventEmitter<void> = new EventEmitter<void>();
}
