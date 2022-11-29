import { Injectable } from '@angular/core';
import { Observable, switchMap, map } from 'rxjs';
import { GithubService } from '../../data-access';
import { MediatorService, ApiError } from '../../shared';
import { Commit, CommitChanges } from '../../typings';
import { Result, fromEither } from '@lonli-lokli/ts-result';

@Injectable()
export class DetailsService {
  public activeCommit$: Observable<Commit>;
  public activeChanges$: Observable<Result<ApiError, CommitChanges>>;
  public activeCommitDiff$: Observable<Result<ApiError, string>>;

  constructor(private api: GithubService, private mediator: MediatorService) {
    this.activeCommit$ = this.mediator.activeCommit$;
    this.activeChanges$ = this.activeCommit$.pipe(
      switchMap((commit) => this.api.getCommit(commit.url)),
      map(fromEither)
    );
    this.activeCommitDiff$ = this.activeCommit$.pipe(
      switchMap((commit) => this.api.getDiff(commit.url)),
      map(fromEither)
    );
  }
}
