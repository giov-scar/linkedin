import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IApiResp } from 'src/app/models/iapi-resp';
import { PostApiResp } from 'src/app/models/post-api-resp';
import { PostService } from 'src/app/post.service';
import { ProfileService } from 'src/app/profile.service';
import { Icommentapi } from '../../models/icommentapi';
import { FullPost } from '../../models/full-post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data!: IApiResp;
  allComments!: Icommentapi[];
  allPost!: PostApiResp[];
  AllFullPost!: FullPost[];
  toDelete: string = '64e713d4ad2497001469364b';
  formPost!: FormGroup;
  maxPostToDisplay!: PostApiResp[];
  maxCommentToDisplay!: Icommentapi[];
  toSeeComments: string = 'tt0399295';

  constructor(
    private profileSvc: ProfileService,
    private postSvc: PostService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMyProfile();
    this.getAll();
    // this.getAllComments();
    this.formPost = this.fb.group({
      text: this.fb.control(null, [Validators.required]),
    });
  }

  getMyProfile() {
    this.profileSvc.getMyProfile().subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }

  getAll() {
    this.postSvc.getAllPost().subscribe((data: PostApiResp[]) => {
      console.log(data);
      data.reverse();
      this.allPost = data;
      this.maxPostToDisplay = data.slice(0, 50);
      this.getAllComments();
    });
  }

  createPost() {
    this.postSvc.insertNewPost(this.formPost.value).subscribe((data) => {
      this.getAll();
      this.formPost.reset();
    });
  }

  deletePost(toDelete: string) {
    this.postSvc.deletePost(toDelete).subscribe((data) => this.getAll());
  }

  getAllComments() {
    this.postSvc.getAllComments().subscribe((data: Icommentapi[]): void => {
      console.log(data, 'commenti');
      data.reverse();
      this.allComments = data;
      this.maxCommentToDisplay = data.slice(0, 50).reverse();
    });
  }
}
