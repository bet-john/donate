import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';

export interface update_password {
  success?: boolean;
  user_id?: any;
  error?: string;
}
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  success_message: update_password = {};
  loading?: boolean = false;
  information_flag?: boolean = false;
  information?: string = '';


  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { };

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  };

  onSubmit() {
    console.log(this.forgotPasswordForm.value);
    this.userService.forgotPassword(this.forgotPasswordForm.value)
      .subscribe(response_success => {
        this.success_message = response_success;
        this.loading = false;
        if (this.success_message.success) { this.router.navigate(['/sign-in']) };
        console.log('this.success_message', this.success_message)
      }, (response_error) => {
        this.loading = false;
        this.success_message = response_error.error;
        this.information_flag = true;
        if (this.success_message.error) { this.information = this.success_message.error; };
      });
  };
};
