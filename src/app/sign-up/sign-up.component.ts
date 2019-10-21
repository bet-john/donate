import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';
export interface success_message {
  success?: boolean;
  message?: string;
  error?: string;
};
@Component({
  selector: 'app-root',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  success_message: success_message = {};
  loading?: boolean = false;
  information_flag?: boolean = false;
  information?: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { };

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.loading = true;
    this.userService.createUser(this.signUpForm.value)
      .subscribe(response_success => {
        this.loading = false;
        this.success_message = response_success;
        this.information_flag = false;
        if (this.success_message.success) { this.router.navigate(['/sign-in']) };
      },
        (response_error) => {
          this.loading = false;
          this.success_message = response_error.error;
          this.information_flag = true;
          if (this.success_message.error) { this.information = this.success_message.error; };
        });
  };
}
