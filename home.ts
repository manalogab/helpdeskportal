import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Post } from '../dataservice';
import { Observable, map, filter } from 'rxjs';
import { TruncatePipe } from '../truncate.pipe';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TruncatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  latestPosts$!: Observable<Post[]>;
  currentDate = new Date();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.latestPosts$ = this.dataService.getPosts().pipe(
      filter(posts => posts.length > 0),
      map(posts => posts.slice(0, 5))
    );
  }
}
