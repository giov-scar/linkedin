import { Component } from '@angular/core';
import {ProfileService} from "../../profile.service";
import {IApiResp} from "../../models/iapi-resp";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  data!: IApiResp
  constructor(private profileSvc: ProfileService) {
    this.getMyProfile()
  }
  getMyProfile(){
    this.profileSvc.getMyProfile().subscribe(data => {
      this.data = data
    })
  }

}
