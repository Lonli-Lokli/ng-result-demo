import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { startWith } from 'rxjs/internal/operators/startWith';
import { MediatorService } from '../mediator.service';
import { Branch, Commit, Tag } from '../types';
import { compareVersions, validate } from 'compare-versions';

@Injectable()
export class NavigationService {
  public branches$: Observable<Branch[]>;
  public tags$: Observable<Tag[]>;

  #load$ = new Subject<any>();
  constructor(private http: HttpClient, private mediator: MediatorService) {
    this.branches$ = this.#load$.pipe(
      switchMap(() =>
        this.http.get<Branch[]>(
          `https://api.github.com/repos/angular/angular/branches`
        )
      ),
      startWith([] as Branch[]),
      map((branches) =>
        [...branches]
          .sort((a, b) =>
            validate(a.name) && validate(b.name)
              ? compareVersions(a.name, b.name)
              : -1
          )
          .reverse()
      )
    );
    this.tags$ = this.#load$.pipe(
      switchMap(() =>
        this.http.get<any>(`https://api.github.com/repos/angular/angular/tags`)
      ),
      startWith([] as Branch[])
    );
  }

  load() {
    this.#load$.next('');
  }

  select(item: Branch | Tag) {
    this.mediator.selectBranchOrTag(item);
  }
}
