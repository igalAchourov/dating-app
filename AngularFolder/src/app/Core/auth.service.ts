import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  baseUrl: string = environment.apiUrl + 'auth/';
  decodedToken: any;
  currentUser: User;

  //create new BehaviorSubject of type string as the path for default photo
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  //creates a new variable to prevent leaking the "observer side" of the Subject out of an API
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }


  changeMemberPhoto(photoUrl: string) {
    //parse the value and then this update the photoUrl
    this.photoUrl.next(photoUrl);
  }


  login(user: User) {
    return this.http.post(this.baseUrl + 'login', user)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user.user;
            this.changeMemberPhoto(this.currentUser.photoUrl)
          }
        })
      )
  }


  register(user: User) {
    return this.http.post(this.baseUrl + "register", user);
  }


  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
