import { Component } from '@angular/core';
import { FacebookService, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'octo-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  networks: string[];
  selectedNetwork: string;

  constructor(private fb: FacebookService) {
    this.selectedNetwork = 'CHOOSE A NETWORK';
    this.networks = ['Facebook', 'Google'];
    fb.init({
      appId: '753141531523653',
      version: 'v2.8'
    });
  }

  getFriends(id: string = 'me') {
    this.fb.api(`/${id}/friends`)
      .then(res => console.log(res))
      .catch(err => {
        if (err.type === 'OAuthException') {
          this.logIn().then(() => this.getFriends());
        }
      });
  }

  logIn(): Promise<void> {
    return this.fb.login({ scope: 'user_friends' })
      .then(console.log)
      .catch(console.error);
  }

  selectNetwork(nw: string) {
    this.selectedNetwork = nw;
    if (nw === 'Facebook') {
      this.getFriends();
    }
  }

}
