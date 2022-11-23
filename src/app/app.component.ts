import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ALL_TAIGA_UI_MODULES } from './@stackblitz/all-taiga-modules';
import {
  TUI_ICONS_PATH,
  tuiIconsPathFactory,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

import { NgCommitModule } from '../libs/ng-commit/shared';

@Component({
  selector: `my-app`,
  standalone: true,
  imports: [ALL_TAIGA_UI_MODULES, CommonModule, NgCommitModule],
  providers: [
    // A workaround because StackBlitz does not support assets
    {
      provide: TUI_ICONS_PATH,
      useValue: tuiIconsPathFactory(
        'https://taiga-ui.dev/assets/taiga-ui/icons'
      ),
    },
    /**
     * If you use unsafe icons or have kind of WYSISYG editor in your app
     *
     * Take a look at: https://github.com/tinkoff/ng-dompurify
     *
     * This library implements DOMPurify as Angular Sanitizer or Pipe.
     * It delegates sanitizing to DOMPurify and supports the same configuration.
     */
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ],
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
