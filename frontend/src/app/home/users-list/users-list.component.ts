import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {HttpClient} from "@angular/common/http";
import {env} from "../../../environments/environment";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public user?: User | null;
  public error?: string;
  public displayedColumns: string[] = ['id', 'username', 'email'];
  public dataSource: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.http.get(`${env.apiUrl}/api/users`).subscribe({
      next: (result) => {
        this.dataSource = result;
      },
      error: error => {
        this.error = error;
      }
    });
  }
}
