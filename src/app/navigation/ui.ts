import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Branch, Tag } from '../types';
import { NavigationService } from './data-access';

@Component({
  selector: `my-navigation`,
  templateUrl: `./template.html`,
  styleUrls: ['./styles.less'],
  providers: [NavigationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements AfterViewInit {
  public branches$: Observable<Branch[]>;
  public tags$: Observable<Tag[]>;
  constructor(private svc: NavigationService) {
    this.branches$ = this.svc.branches$;
    this.tags$ = this.svc.tags$;
  }
  ngAfterViewInit(): void {
    this.svc.load();
  }

  onSelect(row: Branch | Tag) {
    this.svc.select(row);
  }
}
