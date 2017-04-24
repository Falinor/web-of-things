import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../../core';

@Component({
  selector: 'octo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;

  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    private router: Router,
    private snackBar: MdSnackBar
  ) {
    this.submitted = false;
  }

  ngOnInit() {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      key: ['', Validators.required]
    });
  }

  logIn(): void {
    this.submitted = true;
    // Log in
    this.authService
      .logIn(this.values.email, this.values.password, this.values.key)
      .subscribe(
        () => this.redirect(this.authService.redirectUrl || '/'),
        (err: Error) => {
          this.snackBar.open(err.message, 'dismiss', { duration: 3000 });
          this.submitted = false;
        },
        () => this.submitted = false // Reset the form
      );
  }

  private redirect(url: string): void {
    this.router.navigate(['/']).then(() => {
      this.snackBar.open('Connected', 'dismiss', { duration: 3000 });
    });
  }

  get controls() {
    return this.loginForm.controls;
  }

  get values() {
    return this.loginForm.value;
  }

}
