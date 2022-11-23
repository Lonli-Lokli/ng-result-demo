import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DetailsService } from './data.service';

type DetailsMode = 'commit' | 'changes' | 'file-tree';
@Component({
  selector: `my-details`,
  templateUrl: `./template.html`,
  styleUrls: ['./styles.less'],
  providers: [DetailsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  public mode: DetailsMode = 'commit';
  changeTab(mode: DetailsMode) {
    this.mode = mode;
  }
}
