import { Component } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(private httpClient: HttpClient) {}

  getData() {
    console.log('aaaaaaaaaa');
    const params = new HttpParams({fromString: 'name=test'});
    this.httpClient.request('GET', 'http://techtest.local/backend/public/lucky/number', {responseType: 'json', params}).subscribe((result: any) => {
      console.log(result);
    });
  }
}
