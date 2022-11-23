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
export class DetailsService {
  public activeCommit$: Observable<Commit>;

  #load$: Observable<string>;
  constructor(private http: HttpClient, private mediator: MediatorService) {
    this.activeCommit$ = this.mediator.activeCommit$;
  }
}
