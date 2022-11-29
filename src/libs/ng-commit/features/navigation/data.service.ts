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
import { mapState, MediatorService } from '../../shared';
import {
  HttpRequestState,
  loadingState,
  isLoadedState,
  isLoadingState,
  loadedState,
  errorState,
} from 'ngx-http-request-state';

export interface TreeNode {
  readonly text: string;
  readonly icon?: string;
  readonly children?: readonly TreeNode[];
  readonly data?: HttpRequestState<Tag | Branch>;
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
            mapState((branches) => [
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
            ])
          ),
          tags: this.api.getAllTags(ANGULAR_REPO),
        })
      ),
      tap(({ branches }) => {
        if (isLoadedState(branches)) {
          this.mediator.selectBranchOrTag(branches.value![0]);
        }
      }),
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
    refs: HttpRequestState<Branch[] | Tag[]> = loadingState<Branch[]>()
  ): TreeNode {
    return {
      text: name,
      children: isLoadedState(refs)
        ? refs.value!.map((ref) => ({
            text: ref.name,
            data: loadedState(ref),
          }))
        : [
            {
              text: '<Unknown>',
              data: isLoadingState(refs)
                ? loadingState<Branch | Tag>()
                : errorState<Branch | Tag>(new Error('failed to load')),
            },
          ],
    };
  }
}
