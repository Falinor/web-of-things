import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/user.model';

@Component({
  selector: 'octo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  private submitted: boolean;

  constructor(private builder: FormBuilder) {
    this.submitted = false;
  }

  ngOnInit() {
    this.loginForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logIn(): void {
    this.submitted = true;
    // TODO: submit the form
    console.log(this.loginForm.value);
  }

  get controls() {
    return this.loginForm.controls;
  }

}
