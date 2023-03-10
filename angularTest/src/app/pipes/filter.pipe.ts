import { Pipe, PipeTransform } from '@angular/core';
import { Posts } from'../posts/store/posts'
@Pipe({
  name: 'filterPost',
})
export class SearchFilterPipe implements PipeTransform {
  transform(
    posts: Posts[],
    filterText: string
  ) {
    if(posts.length === 0 || filterText === '') {
      return posts;
    } else {
      return posts.filter(post => {
        return post.name.toLowerCase().includes(filterText.toLowerCase());
      });
    }

  }
}
