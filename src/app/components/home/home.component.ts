import {FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IApiResp} from 'src/app/models/iapi-resp';
import {PostApiResp} from 'src/app/models/post-api-resp';
import {PostService} from 'src/app/post.service';
import {ProfileService} from 'src/app/profile.service';
import {Icommentapi} from "../../models/icommentapi";
import {FullPost} from "../../models/full-post";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data!: IApiResp;
  allComments!: Icommentapi[];
  allPost!: PostApiResp[];
  comment!:Partial<PostApiResp>
  formPost!: FormGroup;
  // formComment!: FormGroup;
  commentString:string = ''
  maxPostToDisplay!: PostApiResp[]
  maxCommentToDisplay!: Icommentapi[]
  newComment:Partial<Icommentapi> = {
    comment: '',
    rate: 1,
    elementId: '',
  }

  toSeeComments: string = 'tt0399295'

  constructor(
    private profileSvc: ProfileService,
    private postSvc: PostService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getMyProfile();
    this.getAll();
    // this.getAllComments();
    this.formPost = this.fb.group({
      text: this.fb.control(null, [Validators.required]),
    });
    // this.formComment = this.fb.group(
    //   {
    //     comment:this.fb.control(null)
    //   }
    // )
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
      data.reverse()
      this.allPost = data;
      this.maxPostToDisplay = data.slice(0, 50)

    })
  }

  createPost() {
    this.postSvc
      .insertNewPost(this.formPost.value)
      .subscribe((data) => {
        this.getAll()
        this.formPost.reset()
      });
  }

  deletePost(toDelete:string) {
    this.postSvc.deletePost(toDelete).subscribe((data) => this.getAll());
  }

  getAllComments(elId:string) {
    this.postSvc.getAllComments(elId).subscribe((data: Icommentapi[]): void => {
      console.log(data, 'commenti')
      data.reverse()
      this.allComments = data
      this.maxCommentToDisplay = data.slice(0, 50).reverse()
    })
  }
  insertComment(elId:string){
    this.newComment.comment = this.commentString
    this.newComment.elementId = elId
    console.log(this.newComment)
    this.postSvc.insertNewComment(this.newComment).subscribe(data=>this.getAllComments(elId))
  }

}
