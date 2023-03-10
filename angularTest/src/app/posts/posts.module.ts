import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './store/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffect } from './store/posts.effect';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

// import { HighlightDirective } from './directives/highlight.directive'; // ->  imported directive
import { SearchFilterPipe } from '../pipes/filter.pipe';

@NgModule({
  declarations: [
    HomeComponent, AddComponent, EditComponent,
    // HighlightDirective, // -> added directive
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule,
    StoreModule.forFeature('myposts', postReducer),
    EffectsModule.forFeature([PostsEffect])
  ],
})
export class PostsModule {}
