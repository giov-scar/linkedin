import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../profile.service";
import {PostService} from "../../post.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Icommentapi} from "../../models/icommentapi";
import {IApiResp} from "../../models/iapi-resp";

@Component({
  selector: 'app-footer-post',
  templateUrl: './footer-post.component.html',
  styleUrls: ['./footer-post.component.scss']
})
export class FooterPostComponent implements OnInit {
  allComments!: Icommentapi[];
  maxCommentToDisplay!: Icommentapi[];
  data!: IApiResp;
  commentString!: string
  newComment: Partial<Icommentapi> = {
    comment: '',
    rate: 1,
    elementId: '',
  }
  // formComment!: FormGroup;

  constructor(
    private profileSvc: ProfileService,
    private postSvc: PostService,
    // private fb: FormBuilder
  ) {
    // this.getMyProfile()
  }

  ngOnInit() {
    // this.formComment = this.fb.group(
    //   {
    //     comment: this.fb.control(null)
    //   }
    // )
  }

  getAllComments(elId: string) {
    this.postSvc.getAllComments(elId).subscribe((data: Icommentapi[]): void => {
      // console.log(data, 'commenti')
      data.reverse()
      this.allComments = data
      this.maxCommentToDisplay = data.slice(0, 50).reverse()
    })
  }

  // getMyProfile() {
  //   this.profileSvc.getMyProfile().subscribe((data) => {
  //     // console.log(data);
  //     this.data = data;
  //   });
  // }

  insertComment(elId: string = '64e78915c034ff001403f43e') {
    this.newComment.comment = this.commentString
    this.newComment.elementId = elId
    console.log(this.commentString, 'oggetto')
    console.log(this.newComment)
    // this.newComment= {...this.formComment.value}
    // console.log(this.newComment, 'oggetto2')
    //  this.postSvc.insertNewComment(this.newComment).subscribe(data=>this.getAllComments(elId))
  }

}
