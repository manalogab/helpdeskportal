import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Post } from '../dataservice';
import { Observable, map, combineLatest, BehaviorSubject, catchError, of, shareReplay, filter } from 'rxjs';
import { TruncatePipe } from '../truncate.pipe';

@Component({
  selector: 'app-services',
  imports: [CommonModule, FormsModule, TruncatePipe],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {
  allPosts$!: Observable<Post[]>;
  searchTerm$ = new BehaviorSubject<string>('');
  filteredPosts$!: Observable<Post[]>;
  searchTerm = '';
  totalCount$!: Observable<number>;

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    console.log('Services component initialized');

    this.allPosts$ = this.dataService.getPosts().pipe(
      filter(posts => {
        console.log('Filter checking posts:', posts.length);
        return posts.length > 0;
      }),
      map(posts => {
        console.log('Posts passed filter:', posts.length);
        return posts;
      }),
      shareReplay(1)
    );

    this.filteredPosts$ = combineLatest([
      this.allPosts$,
      this.searchTerm$
    ]).pipe(
      map(([posts, term]) => {
        console.log('Combining posts and search term:', posts.length, term);
        if (!term.trim()) {
          return posts;
        }
        const lowerTerm = term.toLowerCase();
        return posts.filter(post =>
          post.title.toLowerCase().includes(lowerTerm) ||
          post.body.toLowerCase().includes(lowerTerm)
        );
      })
    );

    this.totalCount$ = this.filteredPosts$.pipe(
      map(posts => posts.length)
    );
  }

  onSearchChange(term: string): void {
    this.searchTerm$.next(term);
  }
}
