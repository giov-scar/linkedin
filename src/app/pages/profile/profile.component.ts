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
  expData!: ExpApiResp[]
  title = 'ng-bootstrap-modal-demo';
  closeResult!: string;
  modalOptions: NgbModalOptions;
  form!: FormGroup;
  form2!: FormGroup;
  form3!: FormGroup;
  allUsers!: IApiResp[]
  toDelete!: string

  constructor(private profileSvc: ProfileService, private expService: ExperienceService, private modalService: NgbModal, private fb: FormBuilder) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  @ViewChild('box') box!: ElementRef

  ngOnInit() {
    this.getMyProfile()
    // this.getMyExp()
    this.getAll()
    // form inserimento dati profilo

    this.form = this.fb.group({
      title: this.fb.control(
        null,
        [Validators.required]
      ),
      bio: this.fb.control(null, [Validators.required]),
      area: this.fb.control(null, {})
    })

    //   form inserimento nuova esperienza

    this.form2 = this.fb.group({
      role: this.fb.control(
        null,
        [Validators.required]
      ),
      company: this.fb.control(
        null,
        [Validators.required]
      ),
      startDate: this.fb.control(null, [Validators.required]),
      endDate: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
      area: this.fb.control(null, {})
    })
    //form modifica esperienza

    this.form3 = this.fb.group({
      role: this.fb.control(
        null,
        [Validators.required]
      ),
      company: this.fb.control(
        null,
        [Validators.required]
      ),
      startDate: this.fb.control(null, [Validators.required]),
      endDate: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
      area: this.fb.control(null, {})
    })


  }

  send() {
    this.profileSvc.modifyProfile(this.form.value)
    this.getMyProfile()
  }

  addExp() {
    this.expService.addNewExp(this.form2.value, this.data._id).subscribe(data => this.getMyExp())
    console.log(this.form2.value, 'valore del form')
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


  open(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getAll() {
    this.profileSvc.getAllProfile().subscribe((data: IApiResp[]) => {
      console.log(data)
      this.allUsers = data
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
      this.getMyExp()
    })
  }

  getMyExp() {
    console.log(this.data._id)
    this.expService.getAllExp(this.data._id).subscribe((data: ExpApiResp[]) => {
      this.expData = data
      console.log(this.expData, 'data')
    })
  }

  deleteExp() {
    this.expService.deleteExp(this.toDelete, this.data._id).subscribe(data => {
      console.log(data)
      this.getMyProfile()
    })
  }

  modifyExp() {
    this.expService.modifyExp(this.form3.value, this.toDelete, this.data._id).subscribe(data => {
      console.log(data, 'inviata')
      this.getMyExp()
    })
  }

  saveId(expId: string) {
    console.log(expId)
    this.toDelete = expId
  }

}
