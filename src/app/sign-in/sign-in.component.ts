import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';

export interface success {
  success?: boolean;
  user_id?: any
}
@Component({
  selector: 'app-root',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  success_message: success = {};
  loading?: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { };

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  onSubmit() {
    console.log(this.signInForm.value);
    this.userService.login(this.signInForm.value)
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
