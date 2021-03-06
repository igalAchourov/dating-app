import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../Core/user.service';
import { AlertifyService } from '../Core/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../Core/auth.service';

@Injectable()

export class MemberEditResolver implements Resolve<User>{

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService,private authService:AuthService) {

    }
    resolve(route: ActivatedRouteSnapshot): Observable<User> {

        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(catchError(error => {

            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/members']);
            return of(null);

        }))
    }


}