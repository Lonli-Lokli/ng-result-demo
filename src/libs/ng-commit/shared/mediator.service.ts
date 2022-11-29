import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Commit, Tag, Branch } from '../typings';

@Injectable({
  providedIn: 'root',
})
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

  selectCommit(commit?: Commit) {
    this.activeCommitSubj.next(commit ?? null);
  }

  selectBranchOrTag(entity: Branch | Tag) {
    this.activeBranchOrTagSubj.next(entity);
  }
}
