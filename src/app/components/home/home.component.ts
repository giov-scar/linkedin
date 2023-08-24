import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IApiResp } from 'src/app/models/iapi-resp';
import { PostApiResp } from 'src/app/models/post-api-resp';
import { PostService } from 'src/app/post.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data!: IApiResp;
  allPost!: PostApiResp[];
  toDelete: string = '64e713d4ad2497001469364b';
  formPost!: FormGroup;
  constructor(
    private profileSvc: ProfileService,
    private postSvc: PostService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getMyProfile();
    this.getAll();
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
      this.allPost = data;
    });
  }

  createPost() {
    this.postSvc
      .insertNewPost(this.formPost.value)
      .subscribe((data) => this.getAll());
  }

  deletePost() {
    console.log(this.toDelete);
    this.postSvc.deletePost(this.toDelete).subscribe((data) => this.getAll());
  }
}
