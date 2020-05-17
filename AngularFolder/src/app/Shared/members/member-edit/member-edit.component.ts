import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/Core/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Core/user.service';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  //access to browser 
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  user: User;
  photoUrl:string;

  constructor(private ar: ActivatedRoute, private alertify: AlertifyService, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.ar.data.subscribe(data => this.user = data['user'])
    this.authService.currentPhotoUrl.subscribe(photo=>this.photoUrl=photo);
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(next => this.editForm.reset(this.user), error => this.alertify.error(error));
  }

  updateMainPhoto(photoUrl: string) {

    this.user.photoUrl = photoUrl;
    // this.authService.changeMemberPhoto(photoUrl);
  }

}
