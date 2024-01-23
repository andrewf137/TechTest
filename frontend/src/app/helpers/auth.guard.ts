import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    const user = this.authService.userValue;
    if (user) {
        // Authorised so return true
        return true;
    }

    // Not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {});
    return false;
  }
}