import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, startWith, tap } from 'rxjs';
import { MediatorService } from '../../shared';
import { GithubService } from '../../data-access';
import { Branch, Commit, Tag, ANGULAR_REPO } from '../../typings';

@Injectable()
export class CommitsService {
  public activeCommit$: Observable<Commit>;
  public activeBranchOrTag$: Observable<Branch | Tag>;
  public commits$: Observable<Commit[]>;

  #load$: Observable<string>;
  constructor(private api: GithubService, private mediator: MediatorService) {
    this.activeCommit$ = this.mediator.activeCommit$;
    this.activeBranchOrTag$ = this.mediator.activeBranchOrTag$;
    this.#load$ = this.activeBranchOrTag$.pipe(map((row) => row.name));
    this.commits$ = this.#load$.pipe(
      switchMap((branch) => this.api.getLatestCommits(ANGULAR_REPO, branch)),
      startWith([] as Commit[]),
      map((commits) =>
        commits.map((commit) => ({
          ...commit,
          subject: commit.commit.message.split('\n\n')[0] ?? '',
        }))
      ),
      tap((commits) => this.mediator.selectCommit(commits[0]))
    );
  }

  selectCommit(commit: Commit) {
    this.mediator.selectCommit(commit);
  }
}
