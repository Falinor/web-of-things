import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core';

@Component({
  selector: 'octo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  private submitted: boolean;

  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    private router: Router
  ) {
    this.submitted = false;
  }

  ngOnInit() {
    this.loginForm = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logIn(): void {
    this.submitted = true;
    // Log in
    this.authService
      .logIn(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        () => this.redirect(this.authService.redirectUrl),
        (err: Error) => this.error = err.message
      );
  }

  private redirect(url: string = '/'): void {
    this.router.navigate([url]).then(() => {
      // TODO(snackbar): display success message
    });
  }

  get controls() {
    return this.loginForm.controls;
  }

}
