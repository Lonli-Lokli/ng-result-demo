import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: `my-app`,
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
