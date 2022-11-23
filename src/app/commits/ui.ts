import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch, Commit, Tag } from '../types';
import { CommitsService } from './data-access';

@Component({
  selector: `my-commits`,
  templateUrl: `./template.html`,
  styleUrls: ['./styles.less'],
  providers: [CommitsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitsComponent {
  public commits$: Observable<Commit[]>;
  public activeBranchOrTag$: Observable<Branch | Tag>;

  constructor(private svc: CommitsService) {
    this.commits$ = this.svc.commits$;
    this.activeBranchOrTag$ = this.svc.activeBranchOrTag$;
  }

  selectCommit(commit: Commit) {
    this.svc.selectCommit(commit);
  }
}
