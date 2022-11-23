type Taggy<T> = { _tag: T };

export type Branch = {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
} & Taggy<'branch'>;
export type Tag = {
  name: string;
  zipball_url: string;
  tarball_url: string;
  commit: {
    sha: string;
    url: string;
  };
} & Taggy<'tag'>;
export type Commit = {
  sha: string;
  node_id: string;
  commit: CommitInfo;
  subject: string;
  url: string;
  html_url: string;
  comments_url: string;
  author: Author;
  committer: Author;
  parents: Parent[];
} & Taggy<'commit'>;

export interface Author {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: Type;
  site_admin: boolean;
}

export enum Type {
  User = 'User',
}

export interface CommitInfo {
  author: CommitAuthor;
  committer: CommitAuthor;
  message: string;
  tree: Tree;
  url: string;
  comment_count: number;
  verification: Verification;
}

export interface CommitAuthor {
  name: string;
  email: string;
  date: Date;
}

export interface Tree {
  sha: string;
  url: string;
}

export interface Verification {
  verified: boolean;
  reason: Reason;
  signature: null;
  payload: null;
}

export enum Reason {
  Unsigned = 'unsigned',
}

export interface Parent {
  sha: string;
  url: string;
  html_url: string;
}
