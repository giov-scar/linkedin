import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";
import {IApiResp} from "./models/iapi-resp";
import {ProfileService} from "./profile.service";
import {ExpApiResp} from "./models/exp-api-resp";

@Injectable({
  providedIn: 'root'
})
export class ExperienceService implements OnInit{
  userId!:string

  constructor(private http: HttpClient, private router: Router, private profileSvc: ProfileService) {}
  ngOnInit() {
    this.profileSvc.getMyProfile().subscribe(data=>this.userId = data._id)
  }

  getAllExp(): Observable<ExpApiResp> {
    console.log(this.userId, 'id')
    return this.http.get<ExpApiResp>(`${environment.BASE_URL}:${this.userId}/experiences`)
  }


}