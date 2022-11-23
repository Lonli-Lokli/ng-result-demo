import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Branch, Tag } from '../../typings';
import { NavigationService, TreeNode } from './data.service';
import { EMPTY_ARRAY, TuiHandler } from '@taiga-ui/cdk';

@Component({
  selector: `my-navigation`,
  templateUrl: `./template.html`,
  styleUrls: ['./styles.less'],
  providers: [NavigationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements AfterViewInit {
  public node$: Observable<TreeNode>;
  public activeNodeData$: Observable<Branch | Tag>;
  private filter: string | null = null;

  constructor(private svc: NavigationService) {
    this.node$ = this.svc.node$;
    this.activeNodeData$ = this.svc.activeNodeData$;
  }
  ngAfterViewInit(): void {
    this.svc.load();
  }

  onSelect(row: Branch | Tag) {
    if (row) {
      this.svc.select(row);
    }
  }

  readonly handler: TuiHandler<TreeNode, readonly TreeNode[]> = (item) =>
    replaceWithEmpty(item.children?.filter(this.satisfies.bind(this)));

  private satisfies(node: TreeNode) {
    return this.filter !== null &&
      this.filter !== undefined &&
      this.filter !== ''
      ? node.text.toUpperCase().includes(this.filter.toUpperCase())
      : true;
  }

  onFilterChanged(filter: string) {
    this.filter = filter;
  }
}

const replaceWithEmpty = <T>(input: T[] | null | undefined) => {
  return input === null || input === undefined || input.length === 0
    ? EMPTY_ARRAY
    : input;
};
