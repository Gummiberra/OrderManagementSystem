import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  userToEdit?: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((result: User[]) => (this.users = result));
  }

  updateUserList(users: User[])
  {
    this.users = users;
  }

  initNewUser()
  {
    this.router.navigate(['user']);
  }

  editUser(user: User)
  {
    this.router.navigate(['user', user.id]);
  }
}
