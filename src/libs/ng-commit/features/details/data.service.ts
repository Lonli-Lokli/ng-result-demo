import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { GithubService } from '../../data-access';
import { MediatorService } from '../../shared';
import { Commit, CommitChanges } from '../../typings';
import { HttpRequestState } from 'ngx-http-request-state';

@Injectable()
export class DetailsService {
  public activeCommit$: Observable<Commit>;
  public activeChanges$: Observable<HttpRequestState<CommitChanges>>;
  public activeCommitDiff$: Observable<HttpRequestState<string>>;

  constructor(private api: GithubService, private mediator: MediatorService) {
    this.activeCommit$ = this.mediator.activeCommit$;
    this.activeChanges$ = this.activeCommit$.pipe(
      switchMap((commit) => this.api.getCommit(commit.url))
    );
    this.activeCommitDiff$ = this.activeCommit$.pipe(
      switchMap((commit) => this.api.getDiff(commit.url))
    );
  }
}
