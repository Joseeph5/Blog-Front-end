import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Blog } from '../models/Blog.model';
import { BlogService } from '../services/blog.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnChanges {
  blogList: Blog[] = [];
  blogListFilter: Blog[] = [];

  searchTerm: string;
  constructor(private http: HttpClient, private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.fetchAllBlogs().subscribe((response) => {
      if (response) {
        this.blogList = response;
        this.blogListFilter = response;
      }
    });
  }

  onSearch() {
    const newArry = this.blogListFilter.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.blogList = newArry;
  }

  onUpVote(blog: Blog) {
    const newBlog = {
      ...blog,
      upvote: blog.upvote + 1,
      downvote: blog.downvote,
    };

    console.log(newBlog);
    this.blogService.updateBlog(blog._id, newBlog).subscribe((response) => {
      if (response) {
      }
    });
  }
  onDownVote(blog: Blog) {
    const newBlog = {
      ...blog,
      upvote: blog.upvote,
      downvote: blog.downvote + 1,
    };

    this.blogService.updateBlog(blog._id, newBlog).subscribe((response) => {
      if (response) {
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
