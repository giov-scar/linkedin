import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../profile.service";
import {Observable} from "rxjs";
import {IApiResp} from "../../models/iapi-resp";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  data!: IApiResp

  constructor(private profileSvc: ProfileService) {

  }
  ngOnInit() {
    this.getMyProfile()
    // this.getSpecific()
     // this.getAll()
      this.getMe()
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
   getMe(){
      this.profileSvc.getMyProfile().subscribe(data=>{
        console.log(data)
        this.data = data
      })
   }

   getMyProfile(){
    this.profileSvc.getMyProfile().subscribe(data => {
      console.log(data)
      this.data = data
    })
   }

}
