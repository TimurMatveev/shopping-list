import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'sl-progress[value]',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms cubic-bezier(0.4, 0, 0.6, 1)', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('250ms cubic-bezier(0.4, 0, 0.6, 1)', style({ opacity: 0 }))
      ]),
    ]),
  ],
})
export class ProgressComponent {
  @Input() public value!: number;

  @Input() @HostBinding('style.--sl-progress-size.px') public diameter: number = 40;
}
