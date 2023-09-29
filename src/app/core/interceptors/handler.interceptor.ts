import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading/loading.service';
import { AlertService } from '../services/alert/alert.service';

@Injectable({
  providedIn: 'root',
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService, private alertService: AlertService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true, request.url);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.alertService.error(error.error ? error.error.errorMessage ? error.error.errorMessage : '!Technical Error!' : '!Technical Error!');
          } else if (error.status === 500 || error.status === 502 || error.status === 503) {
            this.alertService.error(error.error ? error.error.errorMessage ? error.error.errorMessage : '!Technical Error!' : '!Technical Error!');
          } else if (error.status === 400) {
            this.alertService.error(error.error ? error.error.errorMessage ? error.error.errorMessage : '!BAD REQUEST!' : '!BAD REQUEST!');
          } else if (error.status === 404) {
            this.alertService.error(error.error ? error.error.errorMessage ? error.error.errorMessage : '!METHOD NOT FOUND!' : '!METHOD NOT FOUND!');
          } else {
            this.alertService.error(error.error ? error.error.errorMessage ? error.error.errorMessage : '!SYSTEM ERROR!' : '!SYSTEM ERROR!');
          }
        }

        return throwError(error);
      }),
      finalize(() => this.loadingService.setLoading(false, request.url))
    );
  }
}
