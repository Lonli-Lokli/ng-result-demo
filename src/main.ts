import './polyfills';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

import { importProvidersFrom } from '@angular/core';
import {
  ALL_TAIGA_UI_MODULES,
  ROOT_MODULES,
} from './app/@stackblitz/all-taiga-modules';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom([...ROOT_MODULES, ...ALL_TAIGA_UI_MODULES]),
  ],
})
  .then((ref) => {
    // Stackblitz: Ensure Angular destroys itself on hot reloads.
    if (window['ngRef' as any]) {
      (window['ngRef' as any] as any).destroy();
    }

    (window['ngRef' as any] as any) = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
