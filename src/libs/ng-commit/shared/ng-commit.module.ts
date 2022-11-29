import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ALL_TAIGA_UI_MODULES } from '../../../app/@stackblitz/all-taiga-modules';
import { ResultModule } from '@lonli-lokli/ng-result';

import {
  ChangesComponent,
  CommitComponent,
  CommitsComponent,
  DetailsComponent,
  NavigationComponent,
} from '../features';
import { DiffComponent } from '../ui';

const components = [
  ChangesComponent,
  CommitComponent,
  CommitsComponent,
  DetailsComponent,
  NavigationComponent,
  DiffComponent,
];
@NgModule({
  imports: [CommonModule, ALL_TAIGA_UI_MODULES, ResultModule],
  declarations: [...components],
  exports: [...components],
})
export class NgCommitModule {}
