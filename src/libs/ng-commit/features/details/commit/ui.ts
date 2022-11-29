import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { Commit } from '../../../typings';
import { ApiError } from '../../../shared';
import { DetailsService } from '../data.service';
import { initial, success, Result } from '@lonli-lokli/ts-result';

@Component({
  selector: `my-commit`,
  templateUrl: `./template.html`,
  styleUrls: ['./styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitComponent {
  public commit$: Observable<Result<ApiError, Commit>>;
  constructor(private svc: DetailsService) {
    this.commit$ = this.svc.activeCommit$.pipe(
      map((commit) => success(commit)),
      startWith(initial())
    );
  }
}
