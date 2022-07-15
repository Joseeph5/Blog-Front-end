import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
})
export class AddBlogComponent implements OnInit {
  addBlogForm: FormGroup;
  requireMsg: boolean = false;
  constructor(
    private blogService: BlogService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.addBlogForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const blogValues = this.addBlogForm.value;
    if (blogValues.title && blogValues.author && blogValues.content) {
      this.requireMsg = false;

      const newBlog = {
        ...blogValues,
        upvote: 0,
        downvote: 0,
      };
      this.blogService.insertBlog(newBlog).subscribe((response) => {
        if (response) {
          this.modalService.dismissAll();
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.requireMsg = true;
    }
  }
}
