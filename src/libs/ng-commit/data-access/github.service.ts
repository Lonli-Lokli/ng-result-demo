import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  mapBranchesApi,
  mapCommitChangesApi,
  mapCommitsApi,
  mapTagsApi,
} from './mappers';
import {
  BranchApi,
  CommitApi,
  TagApi,
  CommitChangesApi,
} from './network-types';
import { HttpRequestState, httpRequestStates } from 'ngx-http-request-state';
import { Branch, Tag, Commit, CommitChanges } from '../typings';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  public getAllBranches(path: {
    owner: string;
    repo: string;
  }): Observable<HttpRequestState<Branch[]>> {
    return this.http
      .get<BranchApi[]>(
        `https://api.github.com/repos/${path.owner}/${path.repo}/branches?per_page=100`
      )
      .pipe(map(mapBranchesApi), httpRequestStates());
  }

  public getAllTags(path: {
    owner: string;
    repo: string;
  }): Observable<HttpRequestState<Tag[]>> {
    return this.http
      .get<TagApi[]>(
        `https://api.github.com/repos/${path.owner}/${path.repo}/tags?per_page=100`
      )
      .pipe(map(mapTagsApi), httpRequestStates());
  }

  public getLatestCommits(
    path: {
      owner: string;
      repo: string;
    },
    ref: string
  ): Observable<HttpRequestState<Commit[]>> {
    return this.http
      .get<CommitApi[]>(
        `https://api.github.com/repos/${path.owner}/${path.repo}/commits?sha=${ref}`
      )
      .pipe(map(mapCommitsApi), httpRequestStates());
  }

  public getCommit(url: string): Observable<HttpRequestState<CommitChanges>> {
    return this.http
      .get<CommitChangesApi>(url)
      .pipe(map(mapCommitChangesApi), httpRequestStates());
  }

  public getDiff(url: string): Observable<HttpRequestState<string>> {
    return this.http
      .get(url, {
        headers: new HttpHeaders().set('Accept', 'application/vnd.github.diff'),
        observe: 'body',
        responseType: 'text',
      })
      .pipe(httpRequestStates());
  }
}
