import { Component, OnInit } from '@angular/core';
import { FacebookService, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'octo-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  connected: boolean;
  init: boolean;
  nextPage: string;
  users: { id: string, name: string, picture: string }[];
  selectedUsers: { id: string, name: string, picture: string }[];

  constructor(private fb: FacebookService) {
    this.init = false;
    this.users = [];
    this.selectedUsers = [];
  }

  ngOnInit(): void {
    this.fb.init({ appId: '207597153087997', version: 'v2.9' })
    .then(() => this.isLoggedIn())
    .then(() => this.init = true)
    .then(status => this.connected = status)
    .catch(console.error);
  }

  // TODO(refactor)
  findByName(name: string) {
    new Promise((resolve, reject) => {
      this.fb.api(`/search?q=${name}&type=user&debug=all`)
        .then(res => { this.nextPage = res.paging.next; return res; })
        .then(res => {
          const users = res.data;
          this.mergeWithPictures(users)
            .then(fullUsers => this.users = fullUsers)
            .catch(console.error);
        })
        .catch(reject);
    })
    .then((users: { id: string, name: string, picture: string }[]) => this.users = users)
    .catch(console.error);
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

  onNextPage(): void {
    this.fb.api(this.nextPage)
      .then(res => {
        this.nextPage = res.paging.next;
        this.mergeWithPictures(res.data)
          .then(users => this.users.push(...users));
      })
      .catch(console.error);
  }

  onSelectUser(user: any): void {
    const index = this.users.findIndex(o => o.id === user.id);
    this.users.splice(index, 1);
    this.selectedUsers.push(user);
  }

  private mergeWithPictures(users: any): Promise<any> {
    const ids: string[] = users.map(user => user.id);
    return this.fb.api(`/picture?ids=${ids.join(',')}`)
      .then(obj => {
        return users.map(({id, name}) => {
          return {id, name, picture: obj[id].data.url};
        });
      })
      .catch(console.error);
  }

}
