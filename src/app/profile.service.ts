import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";
import {IApiResp} from "./models/iapi-resp";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(private http: HttpClient,
              private router: Router) {
  }

  getAllProfile():Observable<IApiResp> {
    return this.http.get<IApiResp>(`${environment.BASE_URL}`)
  }

   getMyProfile(): Observable<IApiResp> {
     return this.http.get<IApiResp>(`${environment.BASE_URL}me`)
   }

   getSpecificProfile(id:string): Observable<IApiResp> {
     return this.http.get<IApiResp>(`${environment.BASE_URL}${id}`)
   }
   modifyProfile(data:Partial<IApiResp>){
    return this.http.put(`${environment.BASE_URL}`, data).subscribe(data=>console.log(data, 'inviata'))
   }

}
