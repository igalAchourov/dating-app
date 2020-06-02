import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/models/pagination';
import { UserService } from 'src/app/Core/user.service';
import { AuthService } from 'src/app/Core/auth.service';
import { AlertifyService } from 'src/app/Core/alertify.service';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {


  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  constructor(private ar: ActivatedRoute, private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.ar.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    }
    )
  }


  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
      .subscribe((response: PaginatedResult<Message[]>) => {
        this.messages = response.result;
        this.pagination = response.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }


  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure you want to delete this message?', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {

        this.messages.splice(this.messages.findIndex(m=>m.id === id),1);
        this.alertify.success('Message has been deleted')
      },error=>this.alertify.error('Failed to delete the message'));
    })
  }


  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }




}
