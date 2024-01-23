import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {env} from "../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public loading = false;
  public submitted = false;
  public error?: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigateByUrl('home');
    }
  }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
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
    const email = this.f['email'].value;
    const password = this.f['password'].value;

    this.loading = true;

    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    // Send user credentials for authentication
    this.http.post(
      `${env.apiUrl}/api/register`,
      {username, email, password},
      {headers: headers}
    ).subscribe({
      next: (result) => {
        this.router.navigateByUrl('login');
      },
      error: error => {
        this.error = error;
        this.loading = false;
      }
    });
  }
}
