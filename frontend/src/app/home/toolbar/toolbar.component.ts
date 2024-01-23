import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent{
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
