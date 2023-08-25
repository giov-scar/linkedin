import {Component, OnInit, Input} from '@angular/core';
import {PostService} from "../../post.service";
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
  commentString!: string
  newComment: Partial<Icommentapi> = {
    comment: '',
    rate: 1,
    elementId: '',
  }
  @Input() elId!: string
  @Input() userPostId!: string
  @Input() data!: IApiResp


  constructor(
    private postSvc: PostService,
  ) {

  }
  getAllComments() {

    this.postSvc.getAllComments(this.elId).subscribe((data: Icommentapi[]): void => {
      data.reverse()
      console.log(data, 'commenti')
      this.allComments = data
      this.maxCommentToDisplay = data.slice(0, 50).reverse()

    })
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
  deleteComment(commentId:string){
     this.postSvc.deleteComment(commentId).subscribe(data=>{
      console.log('eliminato')
      console.log(commentId, this.userPostId, this.data._id)
      this.getAllComments()

     })
  }

}
