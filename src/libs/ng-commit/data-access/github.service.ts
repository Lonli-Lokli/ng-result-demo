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
import { eitherify } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  public getAllBranches(path: { owner: string; repo: string }) {
    return this.http
      .get<BranchApi[]>(
        `https://api.github.com/repos/${path.owner}/${path.repo}/branches?per_page=100`
      )
      .pipe(map(mapBranchesApi), eitherify());
  }

  public getAllTags(path: { owner: string; repo: string }) {
    return this.http
      .get<TagApi[]>(
        `https://api.github.com/repos/${path.owner}/${path.repo}/tags?per_page=100`
      )
      .pipe(map(mapTagsApi), eitherify());
  }

  public getLatestCommits(
    path: {
      owner: string;
      repo: string;
    },
    ref: string
  ) {
    return this.http
      .get<CommitApi[]>(
        `https://api.github.com/repos/${path.owner}/${path.repo}/commits?sha=${ref}`
      )
      .pipe(map(mapCommitsApi), eitherify());
  }

  public getCommit(url: string) {
    return this.http
      .get<CommitChangesApi>(url)
      .pipe(map(mapCommitChangesApi), eitherify());
  }

  public getDiff(url: string) {
    return this.http
      .get(url, {
        headers: new HttpHeaders().set('Accept', 'application/vnd.github.diff'),
        observe: 'body',
        responseType: 'text',
      })
      .pipe(eitherify());
  }
}
