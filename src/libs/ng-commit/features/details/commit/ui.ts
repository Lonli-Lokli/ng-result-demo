import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../../../typings';
import { DetailsService } from '../data.service';

@Component({
  selector: `my-commit`,
  templateUrl: `./template.html`,
  styleUrls: ['./styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitComponent {
  public commit$: Observable<Commit>;
  constructor(private svc: DetailsService) {
    this.commit$ = this.svc.activeCommit$;
  }
}
