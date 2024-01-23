import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {env} from "../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add auth header with jwt if user is logged in and request is to the api url.
        const user = this.authService.userValue;
        const isLoggedIn = user?.token;
        const isApiUrl = request.url.startsWith(env.apiUrl);
        if (isLoggedIn && isApiUrl) {
            // The request object is immutable, so it is cloned to add the auth header.
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.token}` }
            });
        }

        return next.handle(request);
    }
}