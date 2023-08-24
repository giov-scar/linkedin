import {Component, OnInit, Input} from '@angular/core';
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
export class FooterPostComponent {
  allComments!: Icommentapi[];
  maxCommentToDisplay!: Icommentapi[];
  data!: IApiResp;
  commentString!: string
  newComment: Partial<Icommentapi> = {
    comment: '',
    rate: 1,
    elementId: '',
  }
  @Input() elId!: string

  constructor(
    private profileSvc: ProfileService,
    private postSvc: PostService,
  ) {
  }

  getAllComments() {
    this.getMyProfile()
    this.postSvc.getAllComments(this.elId).subscribe((data: Icommentapi[]): void => {
      data.reverse()
      console.log(data, 'commenti')
      this.allComments = data
      this.maxCommentToDisplay = data.slice(0, 50).reverse()
    })
  }

  getMyProfile() {
    this.profileSvc.getMyProfile().subscribe((data) => {
      this.data = data;
      console.log(data, 'profilo fetch')
    });
  }

  insertComment() {
    this.newComment.comment = this.commentString
    this.newComment.elementId = this.elId
    console.log(this.commentString, 'oggetto')
    console.log(this.newComment)
    this.postSvc.insertNewComment(this.newComment).subscribe((data) => {
        this.getAllComments()

      }
    )
  }

}
