import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private postsSubject = new BehaviorSubject<Post[]>([]);
  public posts$ = this.postsSubject.asObservable();
  private loaded = false;

  constructor(private http: HttpClient) {}  loadPosts(): void {
    if (!this.loaded) {
      console.log('Fetching posts from API...'); // Debug log
      this.http.get<Post[]>(this.apiUrl).pipe(
        tap(posts => {
          console.log('Posts received:', posts.length); // Debug log
          this.postsSubject.next(posts);
          this.loaded = true;
        }),
        catchError(error => {
          console.error('Error loading posts:', error);
          return of([]);
        })
      ).subscribe();
    }
  }

  getPosts(): Observable<Post[]> {
    if (!this.loaded) {
      this.loadPosts();
    }
    return this.posts$;
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
}
