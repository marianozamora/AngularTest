import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { PostsService } from '../posts.service';
import {
  postsFetchAPISuccess,
  deletePostAPISuccess,
  invokePostAPI,
  invokeSaveNewPostAPI,
  invokeUpdatePostAPI,
  invokeDeletePostAPI,
  saveNewPostAPISucess,
  updatePostAPISucess,
} from './posts.action';
import { selectPosts } from './posts.selector';

@Injectable()
export class PostsEffect {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  loadAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokePostAPI),
      withLatestFrom(this.store.pipe(select(selectPosts))),
      mergeMap(([, postformStore]) => {
        if (postformStore.length > 0) {
          return EMPTY;
        }
        return this.postsService
          .get()
          .pipe(map((data) => postsFetchAPISuccess({ allPosts: data })));
      })
    )
  );

  saveNewPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewPostAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.postsService.create(action.newPost).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewPostAPISucess({ newPost: data });
          })
        );
      })
    );
  });

  updatePostAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdatePostAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.postsService.update(action.updatePost).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updatePostAPISucess({ updatePost: data });
          })
        );
      })
    );
  });

  deletePostsAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeletePostAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.postsService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deletePostAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
