export type BranchApi = {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
};
export type TagApi = {
  name: string;
  zipball_url: string;
  tarball_url: string;
  commit: {
    sha: string;
    url: string;
  };
};
export type CommitApi = {
  sha: string;
  node_id: string;
  commit: CommitInfoApi;
  subject: string;
  url: string;
  html_url: string;
  comments_url: string;
  author: AuthorApi;
  committer: AuthorApi;
  parents: ParentApi[];
};

export type CommitChangesApi = {
  sha: string;
  node_id: string;
  commit: CommitApi;
  url: string;
  html_url: string;
  comments_url: string;
  author: AuthorApi;
  committer: AuthorApi;
  parents: ParentApi[];
  stats: StatsApi;
  files: FileInfoApi[];
};

export interface AuthorApi {
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
  type: string;
  site_admin: boolean;
}

export interface CommitInfoApi {
  author: CommitAuthorApi;
  committer: CommitAuthorApi;
  message: string;
  tree: TreeApi;
  url: string;
  comment_count: number;
  verification: VerificationApi;
}

export interface CommitAuthorApi {
  name: string;
  email: string;
  date: string;
}

export interface TreeApi {
  sha: string;
  url: string;
}

export interface VerificationApi {
  verified: boolean;
  reason: string;
  signature: null;
  payload: null;
}

export interface ParentApi {
  sha: string;
  url: string;
  html_url: string;
}
export interface FileInfoApi {
  sha: string;
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string;
  raw_url: string;
  contents_url: string;
  patch: string;
}

export interface StatsApi {
  total: number;
  additions: number;
  deletions: number;
}
