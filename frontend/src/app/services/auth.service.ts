import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {env} from '../../environments/environment';
import {User} from '../models/user';

@Injectable({providedIn: 'root'})
export class AuthService {
  public userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    // Other components can subscribe to "users" to be notified of changes but can't
    // publish to the userSubject so logging in and out of the app can only
    // be done via the authentication service.
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  // Allows other components an easy way to get the value of the currently logged in user
  // without having to subscribe to the user Observable.
  public get userValue(): User {
    return <User>this.userSubject.value;
  }

  public login(username: string, password: string): Observable<User> {

    // Send user credentials for authentication
    return this.http.post<User>(`${env.apiUrl}/api/login_check`, { username, password })
      .pipe(map(user => {
        // Store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        // "user" object is published to all subscribers:
        this.userSubject.next(user);
        return user;
      }));
  }

  public getAuthToken = (): string => {
    return 'Bearer ' + sessionStorage.getItem('JWT');
  };

  public logout(): Observable<Object> {
    // Send logout request to the server
    return this.http.get(`${env.apiUrl}/api/logout`);
  }
}
