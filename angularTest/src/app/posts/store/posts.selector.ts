import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Posts } from './posts';

export const selectPosts = createFeatureSelector<Posts[]>('myposts');

export const selectPostById = (postId: number) =>
  createSelector(selectPosts, (posts: Posts[]) => {
    var postbyId = posts.filter((_) => _.id == postId);
    if (postbyId.length == 0) {
      return null;
    }
    return postbyId[0];
  });
