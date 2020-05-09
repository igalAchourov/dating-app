import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Core/auth.service';
import { AlertifyService } from '../Core/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router, private alertifyService: AlertifyService) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertifyService.error('Login first you bastard ');
    this.router.navigate(['/home']);
    return false;
  }

}
