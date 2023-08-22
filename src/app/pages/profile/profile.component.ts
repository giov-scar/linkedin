import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../profile.service";
import {Observable} from "rxjs";
import {IApiResp} from "../../models/iapi-resp";
import {ExperienceService} from "../../experience.service";
import {ExpApiResp} from "../../models/exp-api-resp";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  data!: IApiResp
  expData!:ExpApiResp

  constructor(private profileSvc: ProfileService, private expService: ExperienceService) {

  }
  ngOnInit() {
    this.getMyProfile()
    // this.getSpecific()
     // this.getAll()
    this.getMyexp()
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

   getMyProfile(){
    this.profileSvc.getMyProfile().subscribe(data => {
      console.log(data)
      this.data = data
    })
   }
   getMyexp(){
    this.expService.getAllExp().subscribe(expData=>console.log(expData))
   }

}
