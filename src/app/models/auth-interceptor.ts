import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let newRequest = request.clone({
      headers: request.headers.append('Authentication', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTQ5ODFmMTc1YzAwMTRjNTU4YzUiLCJpYXQiOjE2OTI2MDM1NDQsImV4cCI6MTY5MzgxMzE0NH0.C7V4YeMJUDOKFb22KMObyy1n4VdVkNsHVKGLxOnJqNE')
    })

    return next.handle(newRequest);
  }
}
