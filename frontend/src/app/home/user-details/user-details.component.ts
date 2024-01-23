import {Component, OnInit} from '@angular/core';
import {env} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public error?: string;
  public userDetails: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.http.get(`${env.apiUrl}/api/users/` + this.getUserId()).subscribe({
      next: (result) => {
        this.userDetails = result;
        console.log(result);
      },
      error: error => {
        this.error = error;
      }
    });
  }

  private getUserId() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }
}
