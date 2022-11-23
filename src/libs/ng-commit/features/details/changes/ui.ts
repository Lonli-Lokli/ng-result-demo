import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommitChanges } from '../../../typings';
import { DetailsService } from '../data.service';

@Component({
  selector: `my-changes`,
  templateUrl: `./template.html`,
  styleUrls: ['./styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangesComponent {
  public changes$: Observable<CommitChanges>;
  public activeCommitDiff$: Observable<string>;
  constructor(private svc: DetailsService) {
    this.changes$ = this.svc.activeChanges$;
    this.activeCommitDiff$ = this.svc.activeCommitDiff$;
  }
}
