import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  TUI_ICONS_PATH,
  tuiIconsPathFactory,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

import { ALL_TAIGA_UI_MODULES } from './@stackblitz/all-taiga-modules';
import { AppComponent } from './app.component';
import { CommitsComponent } from './commits/ui';
import { DetailsComponent } from './details/ui';
import { MediatorService } from './mediator.service';
import { NavigationComponent } from './navigation/ui';

const components = [
  AppComponent,
  NavigationComponent,
  DetailsComponent,
  CommitsComponent,
];
@NgModule({
  /**
   * Don't use this approach,
   * it's a workaround for stackblitz
   */
  imports: [...ALL_TAIGA_UI_MODULES, HttpClientModule, CommonModule],
  declarations: [...components],
  bootstrap: [AppComponent],
  providers: [
    // A workaround because StackBlitz does not support assets
    {
      provide: TUI_ICONS_PATH,
      useValue: tuiIconsPathFactory(
        'https://taiga-ui.dev/assets/taiga-ui/icons'
      ),
    },
    MediatorService,
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
})
export class AppModule {}
