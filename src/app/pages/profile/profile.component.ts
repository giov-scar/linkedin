import { Component } from '@angular/core';
import {ProfileService} from "../../profile.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private profileSvc:ProfileService) {
    this.getAll()
  }
  getAll(){
    this.profileSvc.getAllProfile().subscribe(data=>console.log(data))
  }

}
