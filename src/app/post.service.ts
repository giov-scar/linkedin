import { Injectable } from '@angular/core';
import {PostApiResp} from "./models/post-api-resp";
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  getAllPost():Observable<PostApiResp[]>{
    return this.http.get<PostApiResp[]>(environment.POST_URL)
  }
}
