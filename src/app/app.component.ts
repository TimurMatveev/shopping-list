import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from "./shared/modules/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(
    public authService: AuthService,
  ) {
  }
}
