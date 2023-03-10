import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Posts } from '../store/posts';
import { invokeSaveNewPostAPI } from '../store/posts.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}

  postForm: Posts = {
    id: 0,
    description: '',
    name: '',
  };

  ngOnInit(): void {}

  save() {
    this.store.dispatch(invokeSaveNewPostAPI({ newPost: this.postForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
         this.router.navigate(['/']);
      }
    });
  }
}
