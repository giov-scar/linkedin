import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProfileService} from "../../profile.service";
import {Observable} from "rxjs";
import {IApiResp} from "../../models/iapi-resp";
import {ExperienceService} from "../../experience.service";
import {ExpApiResp} from "../../models/exp-api-resp";
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data!: IApiResp
  expData!: ExpApiResp
  title = 'ng-bootstrap-modal-demo';
  closeResult!: string;
  modalOptions:NgbModalOptions;
  form!:FormGroup;


  constructor(private profileSvc: ProfileService, private expService: ExperienceService, private modalService: NgbModal, private fb: FormBuilder) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }
  @ViewChild('box') box!: ElementRef

  ngOnInit() {
       this.getMyProfile()
     // this.getSpecific()
    //  this.getAll()


    this.form = this.fb.group({
      title: this.fb.control(
        null,
        [Validators.required]
      ),
      bio:this.fb.control(null, [Validators.required]),
      area: this.fb.control(null,{
      })
    })
  }
  send(){
    this.profileSvc.modifyProfile(this.form.value)
    this.getMyProfile()
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  open(content:any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getAll() {
    this.profileSvc.getAllProfile().subscribe(data => {
      console.log(data)
      this.data = data
    })
  }

  getSpecific() {
    this.profileSvc.getSpecificProfile('60fab669fab8670015d6bc99').subscribe(data => {
      console.log(data)
      this.data = data
    })
  }

  getMyProfile() {
    this.profileSvc.getMyProfile().subscribe(data => {
      console.log(data)
      this.data = data
    })
  }

   getMyExp() {
     console.log(this.data._id)
    this.expService.getAllExp(this.data._id).subscribe((data: ExpApiResp) => {
       this.expData = data
       console.log(this.expData, 'data')
     })
   }

}
