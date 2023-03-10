import { createReducer, on } from '@ngrx/store';
import { Posts } from './posts';
import { postsFetchAPISuccess, deletePostAPISuccess, saveNewPostAPISucess, updatePostAPISucess } from './posts.action';

export const initialState: ReadonlyArray<Posts> = [];

export const postReducer = createReducer(
  initialState,
  on(postsFetchAPISuccess, (state, { allPosts }) => {
    return allPosts;
  }),
  on(saveNewPostAPISucess, (state, { newPost }) => {
    let newState = [...state];
    newState.unshift(newPost);
    return newState;
  }),
  on(updatePostAPISucess, (state, { updatePost }) => {
    let newState = state.filter((_) => _.id != updatePost.id);
    newState.unshift(updatePost);
    return newState;
  }),
  on(deletePostAPISuccess, (state, { id }) => {
    let newState =state.filter((_) => _.id != id);
    return newState;
  })
);
