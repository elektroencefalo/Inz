import {Component} from '@angular/core';
import {ToastrService} from 'ngx-toastr'
import {AuthService} from '../service/auth.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthorizationService} from "../Services/authorization.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  result: any;

  constructor(private builder: FormBuilder, private toastr: ToastrService,
              private router: Router, private authorizationsService: AuthorizationService) {
    this.loginForm = this.builder.group({
      username: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required)
    });
    if (sessionStorage.getItem('userName')) {
      this.router.navigate(['/']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.valid) {
      this.authorizationsService.login(this.f.username.value, this.f.password.value)
        .subscribe(res => {
          if (res) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('userName', res.username);
            sessionStorage.setItem('userRole', res.role);
            sessionStorage.setItem('userEmail', res.email);
            this.authorizationsService.isLogged.next(true);
            this.router.navigate(['/']);
          }
          else {
            this.toastr.warning('Dane są niepoprawne.')
          }
        });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}

