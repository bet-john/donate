import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';

export interface success {
  success?: boolean;
  user_id?: any;
  error?: string;
};
@Component({
  selector: 'app-root',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  success_message: success = {};
  loading?: boolean = false;
  information_flag?: boolean = false;
  information?: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { };

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  };

  onSubmit() {
    this.userService.login(this.signInForm.value)
      .subscribe(res => {
        this.success_message = res;
        this.loading = false;
        this.information_flag = false;
        this.success_message = res;
        if (this.success_message.success) {
          this.router.navigate(['/dashboard'])
        }
        console.log('this.success_message', this.success_message)
      }, (response_error) => {
        this.loading = false;
        this.success_message = response_error.error;
        this.information_flag = true;
        if (this.success_message.error) { this.information = this.success_message.error; };
      });
  };
};
