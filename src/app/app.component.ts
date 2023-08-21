import { Component } from '@angular/core';
import {ProfileService} from "./profile.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'linkedin';
  constructor(private profileSvc:ProfileService) {
    this.getAll()
  }
  getAll(){
    this.profileSvc.getAllProfile().subscribe(data=>console.log(data))
  }
}
