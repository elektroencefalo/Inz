import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr'
import {AuthorizationService} from "../Services/authorization.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private builder: FormBuilder, private router: Router,
              private toastr: ToastrService, private authorizationsService: AuthorizationService) {
    this.registerForm = this.builder.group({
      username: this.builder.control('', Validators.required),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      password: this.builder.control('', Validators.required),
    });
  }


  get f() {
    return this.registerForm.controls;
  }

  proceedRegister() {

    if (this.registerForm.valid) {
      console.log(this.f);
      this.authorizationsService.register(this.f.username.value,this.f.email.value, this.f.password.value)
        .subscribe(res => {
          if (res) {
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
      this.toastr.warning('Proszę podać prawidłowe dane.')
    }
  }
}
