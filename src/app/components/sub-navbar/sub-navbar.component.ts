import { Component, HostListener } from '@angular/core';
import { IApiResp } from 'src/app/models/iapi-resp';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-sub-navbar',
  templateUrl: './sub-navbar.component.html',
  styleUrls: ['./sub-navbar.component.scss'],
})
export class SubNavbarComponent {
  data!: IApiResp;
  showSubNavBar = false;
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.pageYOffset > 500) {
      // Regola l'altezza dopo la quale la sub nav bar appare
      this.showSubNavBar = true;
    } else {
      this.showSubNavBar = false;
    }
  }
  constructor(private profileSvc: ProfileService) {}
  ngOnInit() {
    this.getMyProfile();
  }
  getMyProfile() {
    this.profileSvc.getMyProfile().subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }
}
