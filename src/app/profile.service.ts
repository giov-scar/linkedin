import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(private http: HttpClient,
              private router: Router) {
  }

  getAllProfile() {
    return this.http.get(`${environment.BASE_URL}`)
  }
}
