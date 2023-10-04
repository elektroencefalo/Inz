import {Inject, Injectable} from '@angular/core';
import {HttpClient,} from '@angular/common/http';
import {UserInfo} from "../Models/user-info.model";
import {Router} from "@angular/router";
import {BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  // @ts-ignore
  public isLogged = new BehaviorSubject(false);
  baseUrl: string = '';

  constructor(private http: HttpClient,  @Inject('BASE_URL') baseUrl: string , private router: Router) {
    if(environment.production)
    {
      this.baseUrl = baseUrl;
    }
    else {
      this.baseUrl = baseUrl.split(':')[1];
      this.baseUrl = this.baseUrl + ':5058/';
    }
  }

  login(username: string, password: string) {
    return this.http.post<UserInfo>(this.baseUrl + 'api/Auth/login', {username, password});
  }

  register(username: string, email: string, password: string) {
    return this.http.post<UserInfo>(this.baseUrl + 'api/Auth/register', {username, email, password});
  }


  logout() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userEmail');
    this.router.navigate(['login']);
    this.isLogged.next(false);
  }

  isLoggedIn() {
    return sessionStorage.getItem('userName');
  }
}
