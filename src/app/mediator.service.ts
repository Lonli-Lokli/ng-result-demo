import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { Branch, Commit, Tag } from './types';

@Injectable()
export class MediatorService {
  private activeCommitSubj = new BehaviorSubject<Commit | null>(null);
  private activeBranchOrTagSubj = new BehaviorSubject<Branch | Tag | null>(
    null
  );

  public activeCommit$ = this.activeCommitSubj
    .asObservable()
    .pipe(filter((elem): elem is Commit => elem !== null));
  public activeBranchOrTag$ = this.activeBranchOrTagSubj
    .asObservable()
    .pipe(filter((elem): elem is Branch | Tag => elem !== null));

  selectCommit(commit: Commit) {
    this.activeCommitSubj.next(commit);
  }

  selectBranchOrTag(entity: Branch | Tag) {
    this.activeBranchOrTagSubj.next(entity);
  }
}
