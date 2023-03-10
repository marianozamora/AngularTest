import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokePostAPI, invokeDeletePostAPI } from '../store/posts.action';
import { selectPosts } from '../store/posts.selector';
import { Posts } from '../store/posts';
import { Observable } from 'rxjs';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
  ) { }

  posts$ = this.store.pipe(select(selectPosts));
  posts: Posts[] = [];
  // filteredCountries$ = combineLatest([this.allCountries$, this.searchTerm$]).pipe(map(([countries, filter]) => countries.filter((n) => n.name.toLowerCase().includes(filter.toLowerCase())));
  deleteModal: any;
  idToDelete: number = 0;
  _filterText: string = '';
  filteredPosts: Posts[] | undefined;

  get filterText() {
    return this._filterText;
  }

  set filterText(value: string) {
    this._filterText = value;
    this.filteredPosts = this.filtersPostByName(value);
   }

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    // this.searchControl.valueChanges.subscribe((query) => {
    //   console.log(query)
    // })
    this.filteredPosts = []
    this.posts$.subscribe((posts) => {
      this.posts = posts;
      this.filteredPosts = posts;
    });
    this.store.dispatch(invokePostAPI());
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  delete() {
    this.store.dispatch(
      invokeDeletePostAPI({
        id: this.idToDelete,
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.deleteModal.hide();
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }

  filtersPostByName(filterTerm: string) {
    console.log(this.posts, this.posts$)
    if(this.posts.length === 0 || filterTerm === '') {
      return this.posts;
    } else {
      return this.posts.filter(post => {
        return post.name.toLowerCase().includes(filterTerm.toLowerCase());
      });
    }
  }
}
