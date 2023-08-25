import { Component } from '@angular/core';
import { ExperienceService } from 'src/app/experience.service';
import { IApiResp } from 'src/app/models/iapi-resp';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-my-network',
  templateUrl: './my-network.component.html',
  styleUrls: ['./my-network.component.scss'],
})
export class MyNetworkComponent {
  allUsers!: IApiResp[];
  constructor(
    private profileSvc: ProfileService,
    private expService: ExperienceService
  ) {
    this.getAll();
  }

  getAll() {
    this.profileSvc.getAllProfile().subscribe((data: IApiResp[]) => {
      console.log(data);
      this.allUsers = data;
      console.log(this.allUsers);
    });
  }
}
