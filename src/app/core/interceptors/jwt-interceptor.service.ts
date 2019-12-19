import { Injectable } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService {
  constructor(private authService: AuthorizationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.hasValidToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getAccessToken(),
        },
      });
    }
    return next.handle(request);
  }
}
