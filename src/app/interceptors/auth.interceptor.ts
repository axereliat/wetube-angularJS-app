import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (this.authService.isAuthed()) {
      headers['Authorization'] = 'Bearer ' + this.authService.getAuthToken();
    }
    req = req.clone({
      setHeaders: headers
    });
    return next.handle(req);
  }
}
