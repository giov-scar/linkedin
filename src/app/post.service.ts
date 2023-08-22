import { Injectable } from '@angular/core';
import {PostApiResp} from "./models/post-api-resp";
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";
import {ExpApiResp} from "./models/exp-api-resp";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  getAllPost():Observable<PostApiResp[]>{
    return this.http.get<PostApiResp[]>(environment.POST_URL)
  }
  insertNewPost(data:Partial<PostApiResp>){
    return this.http.post(environment.POST_URL, data)
  }

  modifyExp(data:Partial<PostApiResp>, postId:string){
    console.log(data, 'dati passati')
    return this.http.put(environment.POST_URL+postId, data)
  }

  deleteExp(expId:string, postId: string){
    return this.http.delete(environment.POST_URL+postId, {
      responseType: 'text'
    })
  }

}
