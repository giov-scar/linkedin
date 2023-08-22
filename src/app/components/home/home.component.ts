import { Component, OnInit } from '@angular/core';
import { IApiResp } from 'src/app/models/iapi-resp';
import { ProfileService } from 'src/app/profile.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data!: IApiResp
  constructor(private profileSvc: ProfileService,){}
  ngOnInit(): void {
    this.getMyProfile()
  }


getMyProfile() {
  this.profileSvc.getMyProfile().subscribe(data => {
    console.log(data)
    this.data = data

  })
}
}
