import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};



  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  login() {
    this.authService.login(this.model).subscribe(data => {
      console.log("logged in succesfully!")
    }, err => {
      console.log(err)
    })
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    if (token != null) {
      return token
    }
    return null


  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out!')
  }

}
