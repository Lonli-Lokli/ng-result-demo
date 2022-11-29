import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommitChanges } from '../../../typings';
import { ApiError } from '../../../shared';
import { DetailsService } from '../data.service';
import { Result } from '@lonli-lokli/ts-result';

@Component({
  selector: `my-changes`,
  templateUrl: `./template.html`,
  styleUrls: ['./styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangesComponent {
  public changes$: Observable<Result<ApiError, CommitChanges>>;
  public activeCommitDiff$: Observable<Result<ApiError, string>>;
  constructor(private svc: DetailsService) {
    this.changes$ = this.svc.activeChanges$;
    this.activeCommitDiff$ = this.svc.activeCommitDiff$;
  }
}
