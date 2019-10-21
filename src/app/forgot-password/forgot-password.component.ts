import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';

export interface update_password {
  success?: boolean;
  user_id?: any
}
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  success_message: update_password = {};
  loading?: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { };

  forgotPasswordForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  onSubmit() {
    console.log(this.forgotPasswordForm.value);
    this.userService.login(this.forgotPasswordForm.value)
      .subscribe(res => {
        this.success_message = res;
        this.loading = false;
        this.success_message = res;
        if (this.success_message.success) {
          this.router.navigate(['/dashboard'])
        }
        console.log('this.success_message', this.success_message)
      })
  }
}
