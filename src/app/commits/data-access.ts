import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { scan } from 'rxjs/internal/operators/scan';
import { startWith } from 'rxjs/internal/operators/startWith';
import { MediatorService } from '../mediator.service';
import { Branch, Commit, Tag } from '../types';

@Injectable()
export class CommitsService {
  public activeCommit$: Observable<Commit>;
  public activeBranchOrTag$: Observable<Branch | Tag>;
  public commits$: Observable<Commit[]>;

  #load$: Observable<string>;
  constructor(private http: HttpClient, private mediator: MediatorService) {
    this.activeCommit$ = this.mediator.activeCommit$;
    this.activeBranchOrTag$ = this.mediator.activeBranchOrTag$;
    this.#load$ = this.activeBranchOrTag$.pipe(map((row) => row.name));
    this.commits$ = this.#load$.pipe(
      switchMap((branch) =>
        this.http.get<Commit[]>(
          `https://api.github.com/repos/angular/angular/commits?sha=${branch}`
        )
      ),
      startWith([] as Commit[]),
      map((commits) =>
        commits.map((commit) => ({
          ...commit,
          subject: commit.commit.message.split('\n\n')[0] ?? '',
        }))
      )
    );
  }

  selectCommit(commit: Commit) {
    this.mediator.selectCommit(commit);
  }
}
