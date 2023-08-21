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
      headers: request.headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTRlNzFmMTc1YzAwMTRjNTU4YzciLCJpYXQiOjE2OTI2MDM2MjMsImV4cCI6MTY5MzgxMzIyM30.C2UYyPcCoiSvT6m-yWr4foxvga780RWvxSj3qUG5WhE')
    })

    return next.handle(newRequest);
  }
}
