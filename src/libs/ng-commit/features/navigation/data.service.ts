import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  combineLatest,
  Observable,
  switchMap,
  Subject,
  startWith,
  map,
  tap,
} from 'rxjs';
import { compareVersions, validate } from 'compare-versions';
import { GithubService } from '../../data-access';
import { Branch, Tag, ANGULAR_REPO } from '../../typings';
import { MediatorService, tapEither, ApiError, mapEither } from '../../shared';
import { Result, pending, fromEither, success } from '@lonli-lokli/ts-result';

export interface TreeNode {
  readonly text: string;
  readonly icon?: string;
  readonly children?: readonly TreeNode[];
  readonly data?: Result<ApiError, Tag | Branch>;
}

@Injectable()
export class NavigationService {
  public node$: Observable<TreeNode>;
  public activeNodeData$: Observable<Branch | Tag>;

  #load$ = new Subject<any>();
  constructor(private api: GithubService, private mediator: MediatorService) {
    this.activeNodeData$ = this.mediator.activeBranchOrTag$;
    this.node$ = this.#load$.pipe(
      switchMap(() =>
        combineLatest({
          branches: this.api.getAllBranches(ANGULAR_REPO).pipe(
            mapEither((branches) => [
              {
                name: 'main',
                commit: {
                  sha: 'main',
                  url: '',
                },
                _tag: 'branch',
              } as Branch,
              ...[...branches]
                .sort((a, b) =>
                  validate(a.name) && validate(b.name)
                    ? compareVersions(a.name, b.name)
                    : -1
                )
                .reverse(),
            ]),
            tapEither((branches) =>
              this.mediator.selectBranchOrTag(branches[0])
            ),
            map(fromEither)
          ),
          tags: this.api.getAllTags(ANGULAR_REPO).pipe(map(fromEither)),
        })
      ),
      map(({ branches, tags }) => ({
        text: 'Topmost',
        children: [
          this.createTopmostNode('Branches', branches),
          this.createTopmostNode('Tags', tags),
        ],
      })),
      startWith({
        text: 'Topmost',
        children: [
          this.createTopmostNode('Branches'),
          this.createTopmostNode('Tags'),
        ],
      })
    );
  }

  load() {
    this.#load$.next('');
  }

  select(item: Branch | Tag) {
    this.mediator.selectBranchOrTag(item);
  }

  private createTopmostNode(
    name: string,
    refs?: Result<ApiError, Branch[] | Tag[]>
  ) {
    return {
      text: name,
      children: !refs
        ? undefined
        : refs.isSuccess()
        ? refs.value.map((ref) => ({
            text: ref.name,
            data: success(ref),
          }))
        : [
            {
              text: '',
              data: refs.map(() => null! as Branch),
            },
          ],
    };
  }
}
