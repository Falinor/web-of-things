import { Component, OnInit } from '@angular/core';
import { FacebookService, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'octo-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  init: boolean;
  connected: boolean;

  constructor(private fb: FacebookService) {
    this.init = false;
  }

  ngOnInit(): void {
    this.fb.init({ appId: '207597153087997', version: 'v2.9' })
      .then(() => this.isLoggedIn())
      .then(() => this.init = true)
      .then(status => this.connected = status)
      .catch(console.error);
  }

  findByName(name: string) {
    return this.fb.api(`/search?q=${name}&type=user`)
      .then(console.log)
      .catch(err => {
        if (err.type === 'OAuthException') {
          this.logInWithFB().then(() => this.findByName(name));
        }
      });
  }

  isLoggedIn(): Promise<boolean> {
    return this.fb.getLoginStatus()
      .then(res => res.status === 'connected')
      .catch(console.error);
  }

  logInWithFB(): Promise<void> {
    return this.fb.login()
      .then(console.log)
      .catch(console.error);
  }

}
