import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public error?: string;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  public logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.authService.userSubject.next(null);
        this.router.navigateByUrl('login');
      },
      error: error => {
        this.error = error;
      }
    });
  }
}
