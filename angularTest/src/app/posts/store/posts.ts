export interface Posts {
  id: number;
  name: string;
  description: string;
}

export interface PostsState {
  searchText: string,
  filteredPosts: Posts[];
}
