import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public loading = false;
  public submitted = false;
  public error?: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigateByUrl('home');
    }
  }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  public onSubmit() {
    this.submitted = true;

    this.error = '';

    if (this.form.invalid) {
      return;
    }

    const username = this.f['username'].value;
    const password = this.f['password'].value;

    this.loading = true;

    this.authService.login(username, password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('home');
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}
