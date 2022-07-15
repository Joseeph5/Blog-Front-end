import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../models/Blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type, Accept, Authorization',
    }),
  };

  fetchAllBlogs() {
    return this.http.get<Blog[]>('http://127.0.0.1:8000/blogs/');
  }

  fetchOneBlog(id: string) {
    return this.http.get<Blog>('http://127.0.0.1:8000/blogs/' + id);
  }

  updateBlog(id: string, blog: Blog) {
    return this.http.put<Blog>(
      'http://127.0.0.1:8000/blogs/update/' + id,
      blog,
      this.options
    );
  }

  insertBlog(blog: Blog) {
    return this.http.post<Blog>(
      'http://127.0.0.1:8000/blogs/create/',
      blog,
      this.options
    );
  }

  deleteOneBlog(id: string) {
    return this.http.delete<string>('http://127.0.0.1:8000/blogs/' + id);
  }
}
