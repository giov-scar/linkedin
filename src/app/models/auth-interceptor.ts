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
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTI2YzFmMTc1YzAwMTRjNTU4YmUiLCJpYXQiOjE2OTI2MDI5ODgsImV4cCI6MTY5MzgxMjU4OH0.tw_FBF69PPmRf_AuQIMSizjvTGanmHhw4XcBEGXJ8J8'
      ),
    });

    return next.handle(newRequest);
  }
}
