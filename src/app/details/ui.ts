import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../types';
import { DetailsService } from './data-access';

@Component({
  selector: `my-details`,
  templateUrl: `./template.html`,
  styleUrls: ['./styles.less'],
  providers: [DetailsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  public commit$: Observable<Commit>;

  constructor(private svc: DetailsService) {
    this.commit$ = this.svc.activeCommit$;
  }
  onActiveItemIndexChange(index: number) {
    console.log(index);
  }
}
