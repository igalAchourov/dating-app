import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/auth.service';
import { AlertifyService } from 'src/app/Core/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};



  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    
  }


  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('logged in successfuly')
      
    }, error => {
      this.alertify.error(error);
    })
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out')
  }

}
