import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ProfileService} from "../../profile.service";
import {IApiResp} from "../../models/iapi-resp";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit {
  data!: IApiResp
  isActive: Boolean = false
  class:string = 'col-lg-3'
  constructor(private profileSvc: ProfileService) {
    this.getMyProfile()

  }
  @ViewChild('search') search!: ElementRef
  ngAfterViewInit() {
    console.log(this.search.nativeElement.status)

  }
  getMyProfile(){
    this.profileSvc.getMyProfile().subscribe(data => {
      this.data = data
    })
  }

 changeStat(){
   this.isActive = !this.isActive
   if(this.isActive){
     this.class = 'col-lg-5'
     console.log('col-lg-5')
   }else{
     this.class = 'col-lg-3'
     console.log('col-lg-3')
   }
 }

}
