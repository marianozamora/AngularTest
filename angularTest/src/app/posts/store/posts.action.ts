import { createAction, props } from '@ngrx/store';
import { Posts } from './posts';

export const invokePostAPI = createAction(
  '[Posts API] Invoke Posts Fetch API'
);

export const postsFetchAPISuccess = createAction(
  '[Posts API] Fetch API Success',
  props<{ allPosts: Posts[] }>()
);

export const invokeSaveNewPostAPI = createAction(
  '[Posts API] Inovke save new Post api',
  props<{ newPost: Posts }>()
);

export const saveNewPostAPISucess = createAction(
  '[Posts API] save new Post api success',
  props<{ newPost: Posts }>()
);

export const invokeUpdatePostAPI = createAction(
  '[Posts API] Inovke update Post api',
  props<{ updatePost: Posts }>()
);

export const updatePostAPISucess = createAction(
  '[Posts API] update  Post api success',
  props<{ updatePost: Posts }>()
);

export const invokeDeletePostAPI = createAction(
  '[Posts API] Inovke delete Post api',
  props<{id:number}>()
);

export const deletePostAPISuccess = createAction(
  '[Posts API] deleted Post api success',
  props<{id:number}>()
);
