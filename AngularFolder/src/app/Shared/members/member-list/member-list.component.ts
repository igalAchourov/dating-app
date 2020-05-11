import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Core/user.service';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/Core/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService, private alertify: AlertifyService, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.ar.data.subscribe(data => this.users = data['users']);
  }

  // loadUsers() {
  //   this.userService.getUsers().subscribe(
  //     (users: User[]) => this.users = users,
  //     error => { this.alertify.error(error) }
  //   )
  // };




}
