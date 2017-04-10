import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User, UserService } from '../shared/index';

@Component({
  selector: 'octo-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.findAll();
  }

}
