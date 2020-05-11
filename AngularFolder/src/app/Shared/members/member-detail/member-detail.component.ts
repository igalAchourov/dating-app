import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Core/user.service';
import { AlertifyService } from 'src/app/Core/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private userService: UserService, private alertify: AlertifyService, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.ar.data.subscribe(data => this.user = data['user']);
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages =this.getImages();
      
  }

  // we can get the user from the resolver we created or manually 
  // loadUser() {
  //   this.userService.getUser(+this.ar.snapshot.params['id'])
  //     .subscribe(user => this.user = user, error => this.alertify.error(error));
  // }

  getImages() {
    const imageUrls = [];

    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    console.log(imageUrls)
    return imageUrls;

  }






}
