import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { MediatorService, ApiError, mapEither, tapEither } from '../../shared';
import { GithubService } from '../../data-access';
import { Branch, Commit, Tag, ANGULAR_REPO } from '../../typings';
import { Result, fromEither } from '@lonli-lokli/ts-result';

@Injectable()
export class CommitsService {
  public activeCommit$: Observable<Commit>;
  public activeBranchOrTag$: Observable<Branch | Tag>;
  public commits$: Observable<Result<ApiError, Commit[]>>;

  #load$: Observable<string>;
  constructor(private api: GithubService, private mediator: MediatorService) {
    this.activeCommit$ = this.mediator.activeCommit$;
    this.activeBranchOrTag$ = this.mediator.activeBranchOrTag$;
    this.#load$ = this.activeBranchOrTag$.pipe(map((row) => row.name));
    this.commits$ = this.#load$.pipe(
      switchMap((branch) => this.api.getLatestCommits(ANGULAR_REPO, branch)),
      mapEither((commits) =>
        commits.map((commit) => ({
          ...commit,
          subject: commit.commit.message.split('\n\n')[0] ?? '',
        }))
      ),
      tapEither((commits) => this.mediator.selectCommit(commits[0])),
      map(fromEither)
    );
  }

  selectCommit(commit: Commit) {
    this.mediator.selectCommit(commit);
  }
}
