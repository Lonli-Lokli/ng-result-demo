import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch, Commit, Tag } from '../../typings';
import { ApiError } from '../../shared';
import { CommitsService } from './data.service';
import { Result } from '@lonli-lokli/ts-result';

@Component({
  selector: `my-commits`,
  templateUrl: `./template.html`,
  styleUrls: ['./styles.less'],
  providers: [CommitsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitsComponent {
  public commits$: Observable<Result<ApiError, Commit[]>>;
  public activeCommit$: Observable<Commit>;
  public activeBranchOrTag$: Observable<Branch | Tag>;

  constructor(private svc: CommitsService) {
    this.commits$ = this.svc.commits$;
    this.activeBranchOrTag$ = this.svc.activeBranchOrTag$;
    this.activeCommit$ = this.svc.activeCommit$;
  }

  selectCommit(commit: Commit) {
    this.svc.selectCommit(commit);
  }
}
