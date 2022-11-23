import { Branch, Commit, CommitChanges, Tag } from '../typings';
import {
  TagApi,
  BranchApi,
  CommitApi,
  CommitChangesApi,
} from './network-types';

const createTaggy = <U, T>(item: U, tag: T) => ({
  ...item,
  _tag: tag,
});

export const mapBranchesApi = (items: BranchApi[]): Branch[] => {
  return items.map((item) => createTaggy(item, 'branch' as const));
};

export const mapTagsApi = (items: TagApi[]): Tag[] => {
  return items.map((item) => createTaggy(item, 'tag' as const));
};

export const mapCommitsApi = (items: CommitApi[]): Commit[] => {
  return items.map((item) => createTaggy(item, 'commit' as const));
};

export const mapCommitChangesApi = (item: CommitChangesApi): CommitChanges => ({
  ...createTaggy(item, 'changes' as const),
  commit: createTaggy(item.commit, 'commit' as const),
});
