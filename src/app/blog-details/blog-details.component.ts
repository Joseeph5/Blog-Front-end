import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Blog } from '../models/Blog.model';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  id: string;
  closeResult = '';
  addBlogForm: FormGroup;
  blog: Blog;
  requireMsg: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.blogService.fetchOneBlog(this.id).subscribe((response) => {
        this.blog = response;
      });
    });

    this.addBlogForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const updatedBlog = this.addBlogForm.value;
    if (updatedBlog.title && updatedBlog.author && updatedBlog.content) {
      this.requireMsg = false;

      const newBlog = {
        ...updatedBlog,
        upvote: this.blog.upvote,
        downvote: this.blog.downvote,
      };

      this.blogService.updateBlog(this.id, newBlog).subscribe((response) => {
        if (response) {
          this.modalService.dismissAll();
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.requireMsg = true;
    }
  }

  delete(id: string) {
    console.log('id', id);

    this.blogService.deleteOneBlog(id).subscribe((response) => {
      if (response) {
        this.router.navigate(['/home']);
      }
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

    console.log(newBlog);
    this.blogService.updateBlog(blog._id, newBlog).subscribe((response) => {
      if (response) {
      }
    });
  }
}
