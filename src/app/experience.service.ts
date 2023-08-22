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

  getAllExp(userId:string): Observable<ExpApiResp[]> {
    return this.http.get<ExpApiResp[]>(`${environment.BASE_URL}${userId}/experiences`)
  }

  addNewExp(data:Partial<ExpApiResp>, userId:string ){
    return this.http.post(`${environment.BASE_URL}${userId}/experiences`, data)
  }
  deleteExp(expId:string, userId: string){
    return this.http.delete(`${environment.BASE_URL}${userId}/experiences/${expId}`, {
      responseType: 'text'
    })
  }

  modifyExp(data:Partial<ExpApiResp>, expId:string, userId: string){
    console.log(data, 'dati passati')
    return this.http.put(`${environment.BASE_URL}${userId}/experiences/${expId}`, data)
  }


}
