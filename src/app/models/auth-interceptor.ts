import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let newRequest = request.clone({
      headers: request.headers.set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTI5MzFmMTc1YzAwMTRjNTU4YmYiLCJpYXQiOjE2OTI2MDMwMjcsImV4cCI6MTY5MzgxMjYyN30.i-GoNFsrlKGgNdqcvfELZyDPcKM-c-FVc0z9jypW9N4 '
      ),
    });

    return next.handle(newRequest);
  }
}
